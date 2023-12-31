import { useTokenStore } from '@/stores/token'
import { useUserInfoStore } from '@/stores/userInfo'
import router from '@/router'

/**
 * 登出操作
 */
export function logout() {
  const tokenStore = useTokenStore()
  const userInfoStore = useUserInfoStore()

  // 清除token
  tokenStore.removeToken()

  // 清除用户信息
  userInfoStore.removeUserInfo()

  console.log(router)
  // 返回登陆页面
  router.replace('/login')
}
