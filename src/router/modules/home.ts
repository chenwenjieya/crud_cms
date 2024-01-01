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
      meta: {
        title: '首页',
        hidden: false
      },
      component: () => import('@/views/home/home.vue')
      // children: [
      //   {
      //     path: '/home/welcome',
      //     name: 'welcome',
      //     meta: {
      //       title: '欢迎页',
      //       hidden: false,
      //     },
      //     component: () => import('@/views/home/home.vue')
      //   }
      // ]
    }
  ]
}
