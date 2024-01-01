<script setup lang="ts">
import Vertival from './component/vertival.vue'
import Logo from './component/Logo.vue'
import breadCrumb from './component/breadCrumb.vue'
import { useUserInfoStore } from '@/stores/userInfo'
import { logout } from '@/hooks/logOutHook'

const userInfoStore = useUserInfoStore()

const userInfo = userInfoStore.getUserInfo

const handleLogout = () => logout()
</script>

<template>
  <div id="layout-container">
    <div class="layout-left">
      <div class="logo">
        <Logo />
      </div>
      <Vertival />
      <div class="footer"></div>
    </div>
    <div class="layout-right">
      <div class="header">
        <breadCrumb />
        <div class="avatar">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
              <span style="margin-left: 10px">{{ userInfo.username }}</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleLogout">退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="main">
        <RouterView v-slot="{ Component }">
          <Transition name="fade-right" mode="out-in">
            <Component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#layout-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  .layout-left {
    position: relative;
    width: 210px;
    background-color: #001529;
    .logo {
      height: 48px;
      overflow: hidden;
      width: 100%;
    }

    .footer {
      width: 100%;
      height: 40px;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
  .layout-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f0f2f5;
    .header {
      height: 48px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 20px;
      padding-right: 20px;

      .avatar .el-dropdown-link {
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;
      }
    }
    .main {
      overflow: hidden;
      flex: 1;
      background-color: #fff;
      margin: 10px 12px;
    }
  }
}

// 进入后和离开前保持原位
.fade-right-enter-to,
.fade-right-leave-from {
  opacity: 1;
  transform: none;
}

// 设置进入和离开过程中的动画时长0.5s
.fade-right-enter-active,
.fade-right-leave-active {
  transition: all 0.5s;
}

// 进入前和离开后为透明，并在右侧20px位置
.fade-right-enter-from,
.fade-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
