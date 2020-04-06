/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

const actions = {

  /////////////
  // DATOS PARA COTIZACION 
  ////////////

  Cliente_Seleccionado ({ commit }, payload) {
    commit('CLIENTE_SELECCIONADO', payload)
  },

  Descuento_seleccionado ({ commit }, payload) {
    commit('DESCUENTO_SELECCIONADO', payload)
  },

  Parqueo_Seleccionado ({ commit }, payload) {
    commit('PARQUEO_SELECCIONADO', payload)
  },

  Bodega_Seleccionada ({ commit }, payload) {
    commit('BODEGA_SELECCIONADA', payload)
  },

  Enganche_Cliente ({ commit }, payload) {
    commit('ENGANCHE_CLIENTE', payload)
  },

  Meses_Enganche ({ commit }, payload) {
    commit('MESES_ENGANCHE', payload)
  },

  Financiamiento_Bancario ({ commit }, payload) {
    commit('FINANCIAMIENTO_BANCARIO', payload)
  },

  Años_Financiamiento_Bancario ({ commit }, payload) {
    commit('AÑOS_FINANCIAMIENTO_BANCARIO', payload)
  },

  reserva_establecida ({ commit }, payload) {
    commit('RESERVA_ESTABLECIDA', payload)
  },

  vendedor_seleccionado ({ commit }, payload) {
    commit('VENDEDOR_ESTABLECIDO', payload)
  },
  


  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////

  // Vertical NavMenu
  updateVerticalNavMenuWidth ({ commit }, width) {
    commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
  },

  // VxAutoSuggest
  updateStarredPage ({ commit }, payload) {
    commit('UPDATE_STARRED_PAGE', payload)
  },

  // The Navbar
  arrangeStarredPagesLimited ({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list)
  },
  arrangeStarredPagesMore ({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list)
  },

  // /////////////////////////////////////////////
  // UI
  // /////////////////////////////////////////////

  toggleContentOverlay ({ commit }) {
    commit('TOGGLE_CONTENT_OVERLAY')
  },
  updateTheme ({ commit }, val) {
    commit('UPDATE_THEME', val)
  },

  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  updateUserInfo ({ commit }, payload) {
    commit('UPDATE_USER_INFO', payload)
  },
  updateUserRole ({ dispatch }, payload) {
    // Change client side
    payload.aclChangeRole(payload.userRole)

    // Make API call to server for changing role

    // Change userInfo in localStorage and store
    dispatch('updateUserInfo', {userRole: payload.userRole})
  }
}

export default actions
