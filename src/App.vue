<script setup lang="ts">
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <!--切换语言包为中文包-->
    <!-- 一级路由展示 -->
    <RouterView />
  </el-config-provider>
</template>

<style scoped lang="scss"></style>
