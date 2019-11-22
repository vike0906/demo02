import * as types from './mutation-types'
import getters from './getters'

const state = {
  asidebarCollapse:false
};

const mutations = {
  [types.ASIDEBAR_COLLAPSE](state){
    state.asidebarCollapse = state.asidebarCollapse?false:true;
  }
};

export default {
  state,
  mutations,
  getters
}