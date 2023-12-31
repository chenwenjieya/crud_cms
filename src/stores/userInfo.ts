import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore(
  'userInfo',
  () => {
    // 定义用户信息
    const userInfo = ref({})

    // 设置用户信息
    const setUserInfo = (info: any) => {
      userInfo.value = info
    }

    // 获取用户信息
    const getUserInfo = computed(() => userInfo.value)

    // 删除用户信息
    const removeUserInfo = () => {
      userInfo.value = {}
    }

    // TODO 测试代码
    // const counter = ref(0)
    // const doubleCount = computed(() => counter.value * 2)

    // const addCounter = () => counter.value++

    return {
      userInfo,
      getUserInfo,
      setUserInfo,
      removeUserInfo
    }
  },
  {
    persist: {
      storage: sessionStorage
    }
  }
)
