<script setup lang="ts"></script>

<template>
  <div id="layout-container">
    <div class="layout-left"></div>
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
    width: 200px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
  }
  .layout-right {
    border: 1px solid #ddd;
    flex: 1;
  }
}
</style>
