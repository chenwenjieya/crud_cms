<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const matcher = computed(() => {
  if (router.currentRoute.value.name === 'home') {
    return []
  }
  return router.currentRoute.value.matched
})
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in matcher" :key="item.path">{{
      item.meta.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: #606266 !important;
  font-weight: 400 !important;
}
</style>
