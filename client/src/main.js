import Vue from 'vue'
import app from './app'
import container from './pages/container'
import topbar from './components/topbar'

Vue.config.productionTip = false

var index = {
  _main: undefined,
  components: {
    // Pages
    'container' : container,

    //Container Components
    'topbar' : topbar
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
        components: { 
          app,
        },
        template: '<app/>'
      })
  }
}

index.initiate();



