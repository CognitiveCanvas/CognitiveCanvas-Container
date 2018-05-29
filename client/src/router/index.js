import Vue from 'vue'
import VueRouter from 'vue-router'

// Main Pages
import Authentication from '../views/pages/authentication'
import Container from '../views/pages/container'
import Management from '../views/pages/management'
// Reporting Pages
import AdminPage from '../views/pages/admin/adminPage'
import Stat_user from '../views/pages/admin/stat_user'
import Stat_artifact from '../views/pages/admin/stat_artifact'


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
    path: '/Admin',
    name: 'AdminPage',
    meta: { requiresAuth: true },
    component: AdminPage
  },
  {
    path: '/userStat',
    name: 'userStat',
    meta: { requiresAuth: true },
    component: Stat_user
  },
  {
    path: '/mapStat',
    name: 'mapStat',
    meta: { requiresAuth: true },
    component: Stat_artifact
  },
  {
    path: '*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

/*beforeEach((to, from, next) => {
  requireAuth(to, from, next)
})
*/

Vue.use(VueRouter)

export default router
