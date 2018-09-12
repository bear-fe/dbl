export default [
  {path: '/', component: require('pages/home.vue').default},
  {path: '/about', component: require('pages/about.vue').default},
  {path: '*', component: require('pages/404.vue').default}
]
