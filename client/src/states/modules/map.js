import Map from './map'
import constants from '../../models/constants'
import Axios from 'axios'
import requestPromise from 'request-promise'

const state = {
  currentMap: null,
  maps: []
}

const getters = {

}

const mutations = {

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
