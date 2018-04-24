import Map from './map'
import constants from '../../models/constants'
import axios from 'axios'

const state = {
  mapIds: [],
  
}

const getters = {

}

const mutations = {

}

const actions = {
  queryMap (context, { userId }) {
    Axios.get(`${constants.api}/queryMap`, {
      params: {
        userID: userId
      }
    })
      .then(function (response) {
        if (response.data === 'Not Found') {
          let params = {
            contents: [],
            label: response.data }
          context.commit('updateContents', { params })
        } else {
          let params = { contents: response.data,
            label: label }
          context.commit('updateContents', { params })
        }
      })
      .catch(function (error) {
        console.log("there is an error")
        console.log(error)
      })
  }
}

const map = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}

export default map
