<script setup lang="ts">
const props = defineProps({
  item: Object,
  basePath: String
})

/**
 * 只有自己本身，没有子元素
 */
function hasOnlyOne() {
  return !props.item?.children?.length
}
</script>

<template>
  <el-menu-item v-if="hasOnlyOne()" :index="props.basePath">
    <el-icon><location /></el-icon>
    <span style="z-index: 999">{{ props.item.meta?.title }}</span>
  </el-menu-item>

  <el-sub-menu v-else :index="props.basePath">
    <template #title>
      <el-icon><location /></el-icon>
      <span style="z-index: 999">{{ props.item.meta?.title }}</span>
    </template>

    <el-menu-item :index="route.path" v-for="route in props.item.children" :key="route.path">
      <span style="z-index: 999">{{ route.meta?.title }}</span>
    </el-menu-item>
  </el-sub-menu>
</template>

<style lang="scss" scoped></style>
