
/**  
 * index.html入口js 
 * @exports none  
 */

import '@/css/style.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/routes'
import appView from '@/pages/app.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

const app = new Vue({
  el: '#app',
  router,
  render(h) { return h(appView) }
})
