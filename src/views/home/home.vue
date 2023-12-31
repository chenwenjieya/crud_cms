<script setup lang="ts">
import { logout } from '@/hooks/logOutHook'
const home = ref('home')
</script>

<template>
  <div id="home-container">
    {{ home }}
    <button @click="logout">推出</button>
  </div>
</template>

<style lang="scss" scoped></style>
