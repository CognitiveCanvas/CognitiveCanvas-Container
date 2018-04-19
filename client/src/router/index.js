import Vue from 'vue'
import VueRouter from 'vue-router'

// Pages
import Authentication from '../views/pages/authentication'
import Container from '../views/pages/container'
import Management from '../views/pages/management'

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
    path: '/map',
    name: 'Map',
    component: Container
  }
]

export default new VueRouter({routes})
