import Vue from 'vue'
import VueRouter from 'vue-router'

// Pages
import Authentication from '../pages/authentication'
import Container from '../pages/container'
import AdminPage from '../pages/admin/adminPage'
import Stat_user from '../pages/admin/stat_user'
import Stat_artifact from '../pages/admin/stat_artifact'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Authentication',
    component: Authentication
  },
  {
    path: '/Map',
    name: 'Map',
    component: Container
  },
  {
    path: '/Admin',
    name: 'AdminPage',
    component: AdminPage
  },
  {
    path: '/userStat',
    name: 'userStat',
    component: Stat_user
  },
  {
    path: '/mapStat',
    name: 'mapStat',
    component: Stat_artifact
  }
]

export default new VueRouter({routes})
