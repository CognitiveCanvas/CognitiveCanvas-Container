import Vue from 'vue'
import Vuetify from 'vuetify'
import VueCookie from 'vue-cookie'
import Vuex from 'vuex'
import app from './app'
import container from './views/pages/container'
import management from './views/pages/management'
import maptopbar from './views/components/maptopbar'
import titlebar from './views/components/titlebar'
import toptoolbar from './views/components/toptoolbar'
import conceptmap from './views/components/conceptmap'
import sidebar from './views/components/sidebar'
import sidebarToggle from './views/components/sidebarToggle'
import contentCard from './views/components/contentCard'
import createMap from './views/components/createMap'
import enterMap from './views/components/enterMap'
import mapFolder from './views/components/mapFolder'
import noteCard from './views/components/noteCard'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import router from './router/index'
import store from './states/store'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueCookie)
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(VueTabs)
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
    'maptopbar': maptopbar,
    'titlebar': titlebar,
    'top-toolbar': toptoolbar,
    'concept-map': conceptmap,
    'side-bar': sidebar,
    'side-bar-toggle': sidebarToggle,
    'content-card': contentCard,
    'create-map-card': createMap,
    'enter-map-card': enterMap,
    'map-folder': mapFolder,
    'note-card': noteCard
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
