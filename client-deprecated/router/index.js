import Vue from 'vue';
import Router from 'vue-router'
import App from '@/components/App'

export default new Router({
	routes: [
    {
      path: '/',
      name: 'App'
      component: App
    }
	]
})