import LocalUser from "@models/user.js"
import axios from 'axios'

const API = `http://${window.location.hostname}:8081`

const state = {
  localUser: null
}

const mutations: {
  onLogin (state, id) {
    state.localUser = 
  },
  onLogout(state, { params })
}

const actions: {
  login() {

  },
  logout() {

  }
}

export default {
    state,
    actions,
    mutations
}