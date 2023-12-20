import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
export const constantRoutes: RouteRecordRaw[] =[
  { path: '/:catchAll(.*)', redirect: '/404',meta: { hidden:true } },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      hidden: true
    },
    alias: '/:pathMatch(.*)*'
  },
  {
    path: '/403',
    component: () => import('@/views/error-page/403.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    redirect: '/kibana/sso'
  },
  {
    path: '/kibana/sso',
    name: 'KibanaSSO',
    component: () => import('@/views/kibana-sso/index.vue')
  },
]
const router = createRouter({
  history: createWebHashHistory('hash'),
  routes: constantRoutes
})
export default router