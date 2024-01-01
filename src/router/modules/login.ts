export default {
  path: '/login',
  name: 'Login',
  meta: {
    title: '登录',
    hidden: true
  },
  component: () => import('@/views/login/login.vue')
}
