import Vue from 'vue';
import VueRouter from 'vue-router';

// Pages
import Authentication from '../pages/Authentication';
import Container from '../pages/Container';

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
  }
]

export default new VueRouter({routes})