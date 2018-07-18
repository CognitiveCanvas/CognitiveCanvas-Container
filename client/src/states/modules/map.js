import Map from '../../models/map'
import Note from '../../models/note'
import constants from '../../models/constants'
import router from '../../router/index'
import Axios from 'axios'
import requestPromise from 'request-promise'

const state = {
  currentMap: null,
  currentMapIndex: null,
  maps: [],
  note: null
}

const getters = {
}

const mutations = {
  addMap (state, newAddr) {
    let today = new Date()
    let time = "New Map on "+(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+today.getHours()+':'+today.getMinutes()
    
    state.currentMap = new Map(time, newAddr)   
    state.maps.unshift(state.currentMap)
  },
  navigateCurrentMap (state, reqIndex) {
    state.currentMap = state.maps[reqIndex]
    state.currentMapIndex = reqIndex
  },
  syncMaps (state, mapRes) {
    if (mapRes) state.maps = mapRes.map((map) => new Map(map.name, map.url))
  },
  updateNote (state, {nodeId, nodeLabel}) {
    state.note = new Note(nodeLabel, `${constants.host}`+nodeId)
  },
  updateTitle (state, newTitle) {
    state.currentMap.title = newTitle
  },
  deletePermission (state, reqIndex) {
    state.maps[reqIndex].permission = 'DELETED';
    state.currentMap = state.maps[reqIndex];
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
  async retractPermission (context, {index, url}) {
    context.commit('deletePermission', index)
    console.log("in retractPermission")
    console.log(url)
    //Request server to change visibility
    Axios
      .post(`${constants.api}/invisibleMap`, {
        'url': url
      })
      .catch(function (error) {
        bugsnagClient.notify(error)
      })
  },
  syncMaps (context, maps) {
    context.commit('syncMaps', maps)
  },
  actionLog (context, data) {
    Axios
      .post(`${constants.api}/actionLog`, data)
      .catch(function (error) {
        bugsnagClient.notify(error)
      })
  },
  selectNode (context, {nodeId, nodeLabel}) {
    let token = btoa('web:strate')
    let requestURL = `${constants.noteTemplate}/?copy=note_` + nodeId
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
    let createNoteReq = new Request(requestURL, init)

    fetch(createNoteReq)
      .then((response) => {
        console.log("success call", response)
        context.commit('updateNote', {
          nodeId: "note_" + nodeId, 
          nodeLabel: nodeLabel
        })
      })
      .catch((err) => {
        console.log("error", err)
      })
  },
  updateMapName (context, {mapUrl, newTitle}) {
    context.commit('updateTitle', newTitle)
    Axios
      .post(`${constants.api}/updateMapTitle`, {
        'url': mapUrl,
        'newName': newTitle
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
