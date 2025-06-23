/*
 * @Author: Xujianchen
 * @Date: 2025-06-18 09:59:59
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-06-23 15:35:00
 * @Description:
 */
export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/live',
    name: 'live',
    component: () => import('@/views/live2/index.vue'),
  },
]
