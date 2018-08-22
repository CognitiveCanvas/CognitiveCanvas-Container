// initial state
// shape: [{ id, quantity }]
const state = {
  sidebarOpen: false
}

// getters
const getters = {
  sidebarOpen: state => state.sidebarOpen
}

// mutations
const mutations = {
  TOGGLE_SIDEBAR (state) {
    state.sidebarOpen = !state.sidebarOpen
  }
}

// actions
const actions = {
  toggleSidebar (module) {
    module.commit('TOGGLE_SIDEBAR')
  },
  closeSidebar (module) {
    if (state.sidebarOpen) module.commit('TOGGLE_SIDEBAR')
  }
}

const sidebarBehavior = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default sidebarBehavior
