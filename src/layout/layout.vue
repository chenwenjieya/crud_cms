<script setup lang="ts">
import Vertival from './component/vertival.vue'
import Logo from './component/Logo.vue'
import breadCrumb from './component/breadCrumb.vue'
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
        <div>213</div>
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
    .header {
      height: 48px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 20px;
    }
    .main {
      overflow: hidden;
      flex: 1;
      background-color: #f0f2f5;
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
</style>
