import Axios from 'axios'
import constants from '../../models/constants'

const state = {
  contents: [],
  label: ''
}

const mutations = {
  updateContents (state, { params }) {
    state.contents = params.contents
    state.label = params.label
    console.log(state.contents)
  }
}

const actions = {
  queryContent (context, { label }) {
    Axios.get(`${constants.api}/queryContent`, {
      params: {
        label: label
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
        console.log(error)
      })
  }
}

const content = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default content
