import { createRouter, createWebHistory } from 'vue-router'


const modules:Record<string,any> = import.meta.glob(
  ["./modules/**/*.ts", "!./modules/**/remaining.ts"],
  {
    eager: true
  }
);

/** 静态路由 */
const staticRoutes:any[] = [];

Object.keys(modules).forEach(item => {
  console.log(modules[item], 'item')
  staticRoutes.push(modules[item].default)
})


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes, ]
})

export default router
