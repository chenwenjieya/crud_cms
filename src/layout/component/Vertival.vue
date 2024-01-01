<script setup lang="ts">
import { useRouter } from 'vue-router'
import sideBarItem from './sideBarItem.vue'
// 菜单展开和收起 false展开 true 收起
const isCollapse = ref(false)

const router = useRouter()
console.log(router.options.routes)
const menuList = computed(() => {
  const newMenu = router.options.routes.filter((item) => !item.meta?.hidden)
  const lastMenu: any[] = []
  newMenu.forEach((item) => {
    if (!item.name && item.children && item.children.length > 0) {
      lastMenu.push(...item.children)
    } else {
      lastMenu.push(item)
    }
  })

  return lastMenu
})

/**
 * 默认是当前路由
 */
const defaultActive = ref(router.currentRoute.value.path)
</script>

<template>
  <div class="menu_container">
    <el-scrollbar wrap-class="scroller_wrapper">
      <!-- 菜单 -->
      <el-menu
        :default-active="defaultActive"
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
