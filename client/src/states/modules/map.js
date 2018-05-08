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
}

const mutations = {
  addMap (state, newAddr) {
    let today = new Date()
    let time = "New Map on "+(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+today.getHours()+':'+today.getMinutes()
    
    state.currentMap = new Map(time, newAddr)   
    state.maps.unshift(state.currentMap)
//    console.log(state.currentMap)
//    console.log(state.maps)
  },
  navigateCurrentMap (state, reqIndex) {
    state.currentMap = state.maps[reqIndex] 
  },
  syncMaps (state, mapRes) {
    state.maps = mapRes.map((map) => new Map(map.name, map.url))
  }
}

const actions = {
  async createNewMap (context, {userID, newID}) {
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
        context.commit('addMap', `${constants.host}` + newID)
        router.push('map')
      })
      .catch((err) => {
        console.log("error", err)
      })

    let today = new Date();
    Axios
      .post(`${constants.api}/createMap`, {
        'name': "New Map on "+(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+today.getHours()+':'+today.getMinutes(),
        'url': `${constants.host}` + newID,
        'userID': userID
      })
      .catch(function (error) {
        bugsnagClient.notify(error)
      })
  },
  async navigateToMap (context, {index}) {
    context.commit('navigateCurrentMap', index)
    router.push('map')
  },
  syncMaps (context, maps) {
    context.commit('syncMaps', maps)
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
