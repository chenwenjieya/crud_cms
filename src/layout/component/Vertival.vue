<script setup lang="ts">
import { useRouter } from 'vue-router'

import sideBarItem from './sideBarItem.vue'
// 菜单展开和收起 false展开 true 收起
const isCollapse = ref(false)

const router = useRouter()
console.log(router.options.routes)
const menuList = computed(() => {
  return router.options.routes.filter((item) => !item.meta?.hidden)[0].children
})
</script>

<template>
  <div class="menu_container">
    <el-scrollbar wrap-class="scroller_wrapper">
      <!-- 菜单 -->
      <el-menu
        default-active="/home"
        mode="vertical"
        :collapse="isCollapse"
        unique-opened
        background-color="#001529"
        text-color="#FEFEFEA6"
        active-text-color="#FFFFFF"
        class="outer-most"
        router
      >
        <sideBarItem
          class="outer-most"
          v-for="item in menuList"
          :key="item.path"
          :item="item"
          :base-path="item.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.menu_container {
  height: calc(100vh - 88px);
  width: 100%;
}
</style>
