import Vue from 'vue'
import VueRouter from 'vue-router'

// Pages
import Authentication from '../pages/authentication'
import Container from '../pages/container'
import Management from '../pages/management'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Authentication',
    component: Authentication
  },
  {
    path: '/management',
    name: 'Management',
    component: Management
  },
  {
    path: '/Map',
    name: 'Map',
    component: Container
  }
]

export default new VueRouter({routes})
