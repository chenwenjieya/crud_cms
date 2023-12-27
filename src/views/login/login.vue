<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { reactive, ref } from 'vue';
import { bg, illustration, avatar } from './utils/static';
import { loginRules } from './utils/rule';

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  username: '',
  password: '',
})

const loading = ref(false);

// 登陆
const onLogin = async (FormEl: FormInstance|undefined)  => {

  loading.value = true;

  if (!FormEl) return;

  await FormEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');

      // 发送请求，进行前端的登陆逻辑

    } else {
      console.log('error submit!', fields);
      loading.value = false;
      return fields;
    }
  })

}

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (code === "Enter") {
    onLogin(ruleFormRef.value);
  }
}
onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});


</script>
<template>
  <div id="login_container">
    <img :src="bg" class="wave" />
    <div class="login_container_grid">
      <div class="img">
        <!-- <component :is="toRaw(illustration)"></component> -->
        <img :src="illustration" alt="">
      </div>
      <div class="login_box">
        <div class="login_form">
          <div class="logo_container">
            <img :src="avatar" alt="">
          </div>
          <h2 class="title">CRUD_CMS</h2>
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="loginRules"
            size="large"
          >
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
              <el-input
                clearable
                v-model="ruleForm.username"
                placeholder="账号"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                clearable
                show-password
                v-model="ruleForm.password"
                placeholder="密码"
              />
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
@import url("@/style/login.scss");
</style>
