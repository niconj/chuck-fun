import Vue from 'vue'
import Vuex from 'vuex'
import jokeModule from './jokeModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    joke: jokeModule,
  }
})
