import { createRouter, createWebHistory } from 'vue-router'
import { useTokenStore } from '@/stores/token'

const modules: Record<string, any> = import.meta.glob(
  ['./modules/**/*.ts', '!./modules/**/remaining.ts'],
  {
    eager: true
  }
)

/** 静态路由 */
const staticRoutes: any[] = []

Object.keys(modules).forEach((item) => {
  staticRoutes.push(modules[item].default)
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes]
})

// 路由导航守卫
router.beforeEach((to, from) => {
  const tokenStore = useTokenStore()
  /**如果token存在，不能访问登陆页 */
  if (to.fullPath === '/login' && tokenStore.getToken) return '/home'
  /**如果token不存在，只能访问登陆页 */
  if (!tokenStore.getToken && to.fullPath !== '/login') return '/login'

  return true
})

export default router
