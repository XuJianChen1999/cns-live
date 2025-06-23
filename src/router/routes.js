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
    component: () => import('@/views/live/index.vue'),
  },
  {
    path: '/live-room',
    name: 'live-room',
    component: () => import('@/views/live-room/index.vue'),
  },
]
