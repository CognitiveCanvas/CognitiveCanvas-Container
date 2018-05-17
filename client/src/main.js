import Vue from 'vue'
import Vuetify from 'vuetify'
import VueCookie from 'vue-cookie'
import Vuex from 'vuex'
import VueNVD3 from 'vue-nvd3'
import VueKonva from 'vue-konva'

import app from './app'
import container from './pages/container'
import topbar from './components/topbar'
import conceptmap from './components/conceptmap'
import sideBar from './components/sideBar'
import contentCard from './components/contentCard'
import noteCard from './components/noteCard'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import router from './router/index'
import GSignInButton from 'vue-google-signin-button'
import queryData from './stores/queryData'

import adminPage from './pages/admin/adminPage'
import stat_user from './pages/admin/stat_user'
import stat_artifact from './pages/admin/stat_artifact'
import admin_topbar from './components/admin/admin_topbar'
import visualization from './components/admin/visualization'
import dataList from './components/admin/dataList'
import queryCard from './components/admin/queryCard'
import piechart from './components/admin/piechart'
import linechart from './components/admin/linechart'
import barchart from './components/admin/barchart'
import bubblechart from './components/admin/bubblechart'
import stackareachart from './components/admin/stackareachart'
import mapReconstruct from './components/admin/mapReconstruct'

Vue.use(VueKonva)
Vue.use(GSignInButton)
Vue.use(VueCookie)
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(VueNVD3)
Vue.config.productionTip = false

var index = {
  _main: undefined,
  components: {
    // Icon components from font-awesome
    'icon' : Icon,

    // Pages
    'container' : container,
    // Admin Pages
    'adminPage': adminPage,
    'stat_user': stat_user,
    'stat_artifact': stat_artifact,

    // Container Components
    'topbar' : topbar,
    'concept-map' : conceptmap,
    'side-bar' : sideBar,
    'content-card': contentCard,
    'note-card': noteCard,
    // Admin Components
    'admin_topbar': admin_topbar,
    'visualization': visualization,
    'dataList': dataList,
    'queryCard': queryCard,
    'piechart': piechart,
    'barchart': barchart,
    'stackareachart': stackareachart,
    'bubblechart': bubblechart,
    'mapReconstruct': mapReconstruct,
    'linechart': linechart
  },
  initiate () {
    this.initiateComponents();
    this.initiateMain();
  },
  initiateComponents() {
      for (var k in this.components) {
        Vue.component(k, this.components[k]);
      }
  },
  initiateMain () {
    this._main =
      new Vue({
        el: '#app',
        router,
        queryData,
        render: h => h(app)
      })
  }
}

index.initiate()
