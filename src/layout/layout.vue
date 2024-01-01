<script setup lang="ts">
import Vertival from './component/Vertival.vue'
</script>

<template>
  <div id="layout-container">
    <div class="layout-left">
      <div class="logo"></div>
      <Vertival />
      <div class="footer"></div>
    </div>
    <div class="layout-right">
      <RouterView />
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
  }
}
</style>
