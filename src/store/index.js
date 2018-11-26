import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment: (state,data) => {
    state.count+=data;
    },
    // decrement: (state) => {
    //   const obj = state
    //   obj.count -= 1
    // }
  }
})

export default store