import Vue from 'vue'
import VueRouter from 'vue-router'

// Pages
import Authentication from '../views/pages/authentication'
import Container from '../views/pages/container'
import Management from '../views/pages/management'
import Error from '../views/pages/error'

import store from '../states/store'

function requireAuth(to, from, next) {
  console.log("before route")
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log("auth", store.getters['localUser/hasLocalUser'])
    if (store.getters['localUser/hasLocalUser']) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
}
const routes = [
  {
    path: '/', 
    redirect: '/management'
  },
  {
    path: '/login',
    name: 'Authentication',
    meta: { requiresAuth: false },
    component: Authentication
  },
  {
    path: '/management',
    name: 'Management',
    meta: { requiresAuth: true },
    component: Management
  },
  {
    path: '/map',
    name: 'Map',
    meta: { requiresAuth: true },
    component: Container
  },
  {
    path: '/*',
    name: 'Error',
    meta: { requiresAuth: true },
    component: Error
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  requireAuth(to, from, next)
})

Vue.use(VueRouter)

export default router
