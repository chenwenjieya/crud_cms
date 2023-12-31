<script setup lang="ts">
import { ElMessage, type FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import { bg, illustration, avatar } from './utils/static'
import http from '@/service/userController/loginHttp'
import { useTokenStore } from '@/stores/token'
import { useUserInfoStore } from '@/stores/userInfo'
import { useRouter } from 'vue-router'

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '',
  password: ''
})

const loading = ref(false)
const tokenStore = useTokenStore()
const userInfoStore = useUserInfoStore()
const router = useRouter()

// 登陆
const onLogin = async (FormEl: FormInstance | undefined) => {
  loading.value = true

  if (!FormEl) return

  await FormEl.validate(async (valid, fields) => {
    if (valid) {
      // 发送请求，进行前端的登陆逻辑
      try {
        const result: any = await http.login(ruleForm)
        ElMessage.success(result.msg)

        // 登陆成功后，将token存入pinia
        tokenStore.setToken(result.data.token)

        // 获取用户信息
        const userInfo: any = await http.getUserInfo()
        userInfoStore.setUserInfo(userInfo.data)

        // 跳转到首页
        router.push('/home')
      } catch (err) {
        console.log(err)
      } finally {
        loading.value = false
      }
    } else {
      console.log('error submit!', fields)
      loading.value = false
      return fields
    }
  })
}

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (code === 'Enter') {
    onLogin(ruleFormRef.value)
  }
}
onMounted(() => {
  window.document.addEventListener('keypress', onkeypress)
})

onBeforeUnmount(() => {
  window.document.removeEventListener('keypress', onkeypress)
})
</script>
<template>
  <div id="login_container">
    <img :src="bg" class="wave" />
    <div class="login_container_grid">
      <div class="img">
        <!-- <component :is="toRaw(illustration)"></component> -->
        <img :src="illustration" alt="" />
      </div>
      <div class="login_box">
        <div class="login_form">
          <div class="logo_container">
            <img :src="avatar" alt="" />
          </div>
          <h2 class="title">CRUD_CMS</h2>
          <el-form ref="ruleFormRef" :model="ruleForm" size="large">
            <el-form-item
              :rules="[
                {
                  required: true,
                  message: '请输入账号',
                  trigger: 'blur'
                }
              ]"
              prop="username"
            >
              <el-input clearable v-model="ruleForm.username" placeholder="账号" />
            </el-form-item>

            <el-form-item
              prop="password"
              :rules="[
                {
                  required: true,
                  message: '请输入密码',
                  trigger: 'blur'
                }
              ]"
            >
              <el-input clearable show-password v-model="ruleForm.password" placeholder="密码" />
            </el-form-item>

            <el-button
              class="login_btn"
              size="default"
              type="primary"
              :loading="loading"
              @click="onLogin(ruleFormRef)"
            >
              登录
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('@/style/login.scss');
</style>
