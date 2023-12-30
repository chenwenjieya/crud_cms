const Layout = () => import('@/layout/layout.vue')

export default {
  path: '/',
  name: '',
  redirect: '/login',
  component: Layout,
  children: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/home.vue')
    }
  ]
}
