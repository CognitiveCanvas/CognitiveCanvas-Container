import constants from '../../models/constants'
import Axios from 'axios'


const state = {
  label: '',
  empty: true,
  relatedNodes: [],
  relatedEdges: []
}

const getters = {
}

const mutations = {
  setResults (state, {search, result, resNodes, resEdges}) {
    state.label = search
    state.empty = result
    state.relatedNodes = resNodes
    state.relatedEdges = resEdges
    console.log(state)
  }
  
}

const actions = {
  storeElements (context, {status_code, label, nodes, edges}) {
    let res;
    if (status_code == 204) {
      res = true
    } 
    else if (status_code == 200) {
      res = false
    }
    context.commit('setResults', {
      search: label, 
      result: res, 
      resNodes: nodes,
      resEdges: edges
    })
  }
  
}

const relatedElement = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}

export default relatedElement