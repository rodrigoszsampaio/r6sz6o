const routes = [
  {
    path: '/',
    component: () => import('layouts/AboutMe.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'courses', component: () => import('pages/Courses.vue') },
      { path: 'skills', component: () => import('pages/Skills.vue') },
      { path: 'experiences', component: () => import('pages/Experiences.vue') }
    ]
  }
  // {
  //   path: '/cube',
  //   component: () => import('pages/Cube.vue')
  //   // children: [
  //   //   { path: '', component: () => import('pages/Cube.vue') }
  //   // ]
  // }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
