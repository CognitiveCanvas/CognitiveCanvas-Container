import Vue from 'vue'
import Vuetify from 'vuetify'
import VueCookie from 'vue-cookie'
import Vuex from 'vuex'
import VueNVD3 from 'vue-nvd3'
import app from './app'
import container from './views/pages/container'
import management from './views/pages/management'
import topbar from './views/components/topbar'
import conceptmap from './views/components/conceptmap'
import sidebar from './views/components/sidebar'
import sidebarToggle from './views/components/sidebarToggle'
import contentCard from './views/components/contentCard'
import mapCard from './views/components/mapCard'
import newMapCard from './views/components/newMapCard'
import mapCollection from './views/components/mapCollection'
import noteCard from './views/components/noteCard'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import router from './router/index'
import store from './states/store'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import 'vuetify/dist/vuetify.min.css'

import adminPage from './views/pages/admin/adminPage'
import stat_user from './view/pages/admin/stat_user'
import stat_artifact from './views/pages/admin/stat_artifact'
import admin_topbar from './views/components/admin/admin_topbar'
import visualization from './views/components/admin/visualization'
import dataList from './views/components/admin/dataList'
import queryCard from './views/components/admin/queryCard'
import piechart from './views/components/admin/piechart'
import linechart from './views/components/admin/linechart'
import barchart from './views/components/admin/barchart'
import bubblechart from './views/components/admin/bubblechart'
import stackareachart from './views/components/admin/stackareachart'
import mapReconstruct from './views/components/admin/mapReconstruct'

Vue.use(VueCookie)
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(VueTabs)
Vue.use(VueNVD3)
Vue.config.productionTip = false

var index = {
  _main: undefined,
  components: {
    // Icon components from font-awesome
    'icon': Icon,

    // Pages
    'container': container,
    'management': management,

    // Container Components
    'topbar': topbar,
    'concept-map': conceptmap,
    'side-bar': sidebar,
    'side-bar-toggle': sidebarToggle,
    'content-card': contentCard,
    'map-card': mapCard,
    'new-map-card': newMapCard,
    'map-collection': mapCollection,
    'note-card': noteCard

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
    this.initiateComponents()
    this.initiateMain()
  },
  initiateComponents () {
    for (var k in this.components) {
      Vue.component(k, this.components[k]);
    }
  },
  initiateMain () {
    this._main =
      new Vue({
        el: '#app',
        router,
        store,
        render: h => h(app)
      })
  }
}

index.initiate()
