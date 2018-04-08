import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const API = `http://${window.location.hostname}:8081`

export default new Vuex.Store ({
  state: {
    contents: [],
    label: ""
  },
  mutations: {
    updateContents(state, { params }) {
      state.contents = params.contents;
      state.label = params.label;
      console.log(state.contents)
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
        if (response.data === 'Not Found') {
          let params = { contents: [], 
                         label: response.data };
          context.commit('updateContents', { params });
        }
        else {
          let params = { contents: response.data, 
                         label: label };
          context.commit('updateContents', { params });
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    } 
  }
})