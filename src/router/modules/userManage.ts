const Layout = () => import('@/layout/layout.vue')

export default {
  path: '/usermanage',
  name: 'UserManage',
  component: Layout,
  meta: {
    title: '用户管理',
    hidden: false
  },
  children: [
    {
      path: '/home/user',
      name: 'User',
      meta: {
        title: '用户',
        hidden: false
      },
      component: () => import('@/views/user/user.vue')
    },
    {
      path: '/home/role',
      name: 'Role',
      meta: {
        title: '角色',
        hidden: false
      },
      component: () => import('@/views/user/role.vue')
    }
  ]
}
