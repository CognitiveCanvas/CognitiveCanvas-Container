import Vue from 'vue'
import Vuetify from 'vuetify'
import VueCookie from 'vue-cookie'
import app from './app'
import container from './pages/container'
import topbar from './components/topbar'
import conceptmap from './components/conceptmap'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import router from './router/index'

Vue.use(VueCookie)
Vue.use(Vuetify)
Vue.config.productionTip = false

var index = {
  _main: undefined,
  components: {
    // Icon components from font-awesome
    'icon' : Icon,

    // Pages
    'container' : container,

    //Container Components
    'topbar' : topbar,
    'concept-map' : conceptmap,
  },
  initiate() {
    this.initiateComponents();
    this.initiateMain();
  },
  initiateComponents() {
    console.log(this.components)
      for (var k in this.components) {
        console.log(k);
        Vue.component(k, this.components[k]);
      }
  },
  initiateMain() {
    this._main = 
      new Vue({
        el: '#app',
        router,
        render: h => h(app)
      })
  }
}

index.initiate();



