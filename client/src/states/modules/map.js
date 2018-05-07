import constants from '../../models/constants'
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
    state.userID = params.userID
    console.log(state.maps)
  }
}

const actions = {
  async createNewMap (context) {
    let token = btoa('web:strate')

    let requestURL = 'http://webstrates.ucsd.edu/master?copy=steveisawesome'
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
      })
      .catch((err) => {
        console.log("error", e)
      })


    Axios
      .post(`${constants.api}/createMap`, {
        'name': 'Untitle Map',
        'url': 'localhost:8080/newMap'
      })
      .catch(function (error) {
        bugsnagClient.notify(error)
      })
  },
  queryMaps (context, { userId }) {
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
  },
  oldcreateNewMap (context, {newID}) {
//    Axios.get(`${constants.template}/?copy=`, {
//      params:{
//        id: newID
//      }
//    })
    Axios({
      method: 'GET',
      url:`${constants.template}/?copy=`,
      params:{
        id: newID
      },
      auth: {
        username: 'web',
        password: 'strate',
      },
//      headers: {
//        'Access-Control-Allow-Origin': '*',
//        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
//        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
//        'Content-Type': 'application/json',
//        Pragma: 'no-cache',
//        'Access-Control-Expose-Headers': 'Access-Token, Uid'
//      }
    })
      .then(function (response) {
        console.log(response)
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
