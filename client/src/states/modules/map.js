import Axios from 'axios'
import constants from '../../models/constants'
import Map from '../../models/map'

const state = {
  maps: [],
  userID: ''
}

const getters = {
  hasMap (state) {
    return !! state.maps[0]
  }
}

const mutations = {
  updateMaps (state, { params }) {
    state.maps = params.maps
    state.userID = params.userID
    console.log(state.maps)
  }
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
            maps: [],
            userId: response.data }
          context.commit('updateMaps', { params })
        } else {
          let params = { maps: response.data,
            userId: label }
          context.commit('updateMaps', { params })
        }
      })
      .catch(function (error) {
        console.log("ERROR: ")
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
