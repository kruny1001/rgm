
const routes = [
  {
    path: '/',
    component: () => import('layouts/layout.vue'),
    children: [
      { path: 'start', component: () => import('pages/start.vue') },
      { path: 'dev', component: () => import('pages/Index.vue') },
      { path: 'g1', component: () => import('pages/game1.vue') },
      { path: 'g2', component: () => import('pages/game2.vue') },
      { path: 'g3', component: () => import('pages/game3.vue') },
      { path: 'g5', component: () => import('pages/game5-3.vue') },
      { path: 'g4', component: () => import('pages/game4.vue') },
      { path: 'g11', component: () => import('pages/game11.vue') },
      { path: 'g12', component: () => import('pages/game12.vue') },
      { path: 'end', component: () => import('pages/end.vue') },
      { path: 'test', component: () => import('pages/test.vue') },
    ]
  },
  {
    path:'/admin',
    component: () => import('layouts/layout.vue'),
    children: [
      { path: '', component: () => import('pages/admin.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
