import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const API = `http://${window.location.hostname}:8081`

export default new Vuex.Store ({
  state: {
    contents: []
  },
  mutations: {
    updateContents(state, { contents }) {
      state.contents = contents;
      console.log("staet", state.contents);
    }
  },
  actions: {
    queryContent(context, { label }) {
      Axios.get(`${API}/queryContent`, {
        params: {
          label: label
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error)
      })
    } 
  }
})