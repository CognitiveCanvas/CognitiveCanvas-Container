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
  note: null,
  noteCollection: []
}

const getters = {
}

const mutations = {
  addMap (state, {newAddr, newTitle}) {
    state.currentMap = new Map(newTitle, newAddr)   
    state.maps.unshift(state.currentMap)
    state.note = new Note('Invalid Note', `${constants.invalidNoteTemplate}`)
    state.noteCollection.splice(0, state.noteCollection.length)
    console.log("state after addMap Mutation: ", state)
  },
  navigateCurrentMap (state, reqIndex) {
    state.currentMap = state.maps[reqIndex]
    state.currentMapIndex = reqIndex
    state.note = new Note('Invalid Note', `${constants.invalidNoteTemplate}`)
    state.noteCollection.splice(0, state.noteCollection.length)
    console.log("state after navigateCurrentMap Mutation: ", state)
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
  },
  addEditNote (state, {edit, title, url}) {
    if (!state.noteCollection.find(function(element) {return element.url == url;})) {
      state.note.edited = edit;
      if (edit) {
        state.noteCollection.unshift(state.note)
      }
    }
    console.log("state after addEditNote Mutation: ", state)
  },
  displayNote (state, {title, url}) {
    state.note = new Note(title, url)
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
    
    let today = new Date();
    let mapTitle = "New Map on "+(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+today.getHours()+':'+today.getMinutes();

    fetch(createMapReq)
      .then((response) => {
        console.log("success call", response)
        context.commit('addMap', {
          newAddr: `${constants.host}` + newID,
          newTitle: mapTitle
        })
        router.push('map')
      })
      .catch((err) => {
        console.log("error", err)
      })


    Axios
      .post(`${constants.api}/createMap`, {
        'name': mapTitle,
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
    //Request server to change visibility
    Axios
      .post(`${constants.api}/invisibleMap`, {
        'url': url
      })
      .catch(function (error) {
        bugsnagClient.notify(error)
      })
  },
  async copyToNewMap (context, {userId, title, url, index, newId}) {
    let token = btoa('web:strate')
    let requestURL = url + `/?copy=` + newId
    
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
    
    let today = new Date();
    let mapTitle = "Copy of " + title + " on " + (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+today.getHours()+':'+today.getMinutes();

    fetch(createMapReq)
      .then((response) => {
        console.log("success call", response)
        context.commit('addMap', {
          newAddr: `${constants.host}` + newId,
          newTitle: mapTitle 
        })
        router.push('map')
      })
      .catch((err) => {
        console.log("error", err)
      })

    Axios
      .post(`${constants.api}/createMap`, {
        'name': mapTitle,
        'url': `${constants.host}` + newId,
        'userID': userId
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
  markNoteEdit (context, {edited, label, url}) {
    context.commit('addEditNote', {
      edit: edited,
      title: label,
      url: url
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
  },
  openNote (context, {label, id}) {
    context.commit('displayNote', {
      title: label,
      url: id
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
