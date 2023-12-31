import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore(
  'token',
  () => {
    // 定义token
    const token = ref<String | null>(null)

    // 设置token
    const setToken = (newToken: string | null) => {
      token.value = newToken
    }

    // 删除token
    const removeToken = () => {
      token.value = null
    }

    // 获取token
    const getToken = computed(() => token.value)

    return { token, setToken, removeToken, getToken }
  },
  {
    persist: {
      storage: sessionStorage
    }
  }
)
