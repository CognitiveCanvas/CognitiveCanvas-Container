// initial state
const state = {
  sidebarOpen: false,
  tab_options: ['resource', 'note', 'related_element'],
  active_tab: 0
}

// getters
const getters = {
  sidebarOpen: state => state.sidebarOpen,
  sidebarActive: state => state.tab_options[state.active_tab]
}

// mutations
const mutations = {
  TOGGLE_SIDEBAR (state) {
    state.sidebarOpen = !state.sidebarOpen
  },
  SWAP_ACTIVE_TAB (state, {tab_name}) {
    if (state.tab_options.indexOf(tab_name) != -1) {
      state.active_tab = state.tab_options.indexOf(tab_name)
    }
  }
}

// actions
const actions = {
  toggleSidebar (module) {
    module.commit('TOGGLE_SIDEBAR')
  },
  closeSidebar (module) {
    if (state.sidebarOpen) module.commit('TOGGLE_SIDEBAR')
  },
  swapActiveSideTab (module, {label}) {
    module.commit('SWAP_ACTIVE_TAB', {
      tab_name: label
    })
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
