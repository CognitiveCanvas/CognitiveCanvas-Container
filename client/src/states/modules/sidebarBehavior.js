// initial state
const state = {
  sidebarOpen: false,
  tab_options: ['resource', 'note', 'related_element'],
  active_tab: 0
}

// getters
const getters = {
  sidebarOpen: state => state.sidebarOpen,
}

// mutations
const mutations = {
  TOGGLE_SIDEBAR (state) {
    state.sidebarOpen = !state.sidebarOpen
  },
  SWAP_ACTIVE_TAB (state, {tab_name}) {
    let prompt_tab_index = state.tab_options.indexOf(tab_name)
    if (prompt_tab_index != -1) {
      if (prompt_tab_index != state.active_tab) { // Click on different tab => open
        state.active_tab = prompt_tab_index
        state.sidebarOpen = true
      }
      else { // Click on same tab => toggle open/close
        state.sidebarOpen = !state.sidebarOpen
      }
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
