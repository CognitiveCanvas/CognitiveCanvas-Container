import Vue from 'vue';
import VueRouter from 'vue-router';

// Pages
import Authentication from '../pages/Authentication';

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
      name: 'Authentication',
      component: Authentication
  }
]

export default new VueRouter({routes})