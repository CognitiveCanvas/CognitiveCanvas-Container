import Map from '../../models/map'
import constants from '../../models/constants'
import router from '../../router/index'
import Axios from 'axios'
import requestPromise from 'request-promise'

const state = {
  currentMap: null,
  maps: []
}

const getters = {
  hasMap (state) {
    return !! state.maps[0]
  }
}

const mutations = {
  updateMaps (state, { params }) {
    state.maps = params.maps
//    console.log(state.maps)
  }, 
  updateCurrentMap (state, newAddr) {
    let today = new Date()
    let time = "New Map on "+(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+today.getHours()+':'+today.getMinutes()
    
    state.currentMap = new Map(time, newAddr)   
    state.maps.push(state.currentMap)
//    console.log(state.currentMap)
//    console.log(state.maps)
  },
  navigateCurrentMap (state, reqAddr) {
    for (let i=0; i < state.maps.length; i++) {
//      console.log(state.maps[i].url)
//      console.log(reqAddr)
      if (state.maps[i].url == reqAddr) {
        state.currentMap = state.maps[i]
//        console.log(state.currentMap)
      }
    }
  }
}

const actions = {
  async createNewMap (context, {newID}) {
    let token = btoa('web:strate')

    let requestURL = `${constants.template}/?copy=` + newID
    let headers = new Headers()

    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', 'Basic ' + token)

    let init = {
      method: 'GET',
      mode: 'no-cors',
      headers: headers,
      credentials: 'include', 
      withCredentials: true
    }

    let createMapReq = new Request(requestURL, init)

    fetch(createMapReq)
      .then((response) => {
        console.log("success call", response)
        context.commit('updateCurrentMap', `${constants.host}` + newID)
        router.push('map')
      })
      .catch((err) => {
        console.log("error", err)
      })

    let today = new Date();
    Axios
      .post(`${constants.api}/createMap`, {
        'name': "New Map on "+(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+today.getHours()+':'+today.getMinutes(),
        'url': `${constants.host}` + newID
      })
      .catch(function (error) {
        bugsnagClient.notify(error)
      })
  },
  async navigateToMap (context, {addr}) {
    context.commit('navigateCurrentMap', addr)
    router.push('map')
  }
//  queryMaps (context, { userId }) {
//    Axios.get(`${constants.api}/queryMap`, {
//      params: {
//        userID: userId
//      }
//    })
//      .then(function (response) {
//        if (response.data === 'Not Found') {
//          let params = {
//            maps: [],
//            userId: response.data }
//          context.commit('updateMaps', { params })
//        } else {
//          let params = { maps: response.data,
//            userId: label }
//          context.commit('updateMaps', { params })
//        }
//      })
//      .catch(function (error) {
//        console.log("ERROR: ")
//        console.log(error)
//      })
//  }
}

const map = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}

export default map
