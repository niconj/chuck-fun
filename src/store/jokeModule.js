import JokesService from '../services/jokesService'
import { generateRating } from '../shared/utils'
import { CATEGORIES, PAGE_LIMIT } from '../shared/constants'

export default {
  namespaced: true,
  state: {
    allJokes: [],
    filteredJokes: [],
    currentJokes: [],
    categories: [],
    selectedCategories: [],
    searchTerm: '',
    selectedFilter: '',
    selectedJoke: null,
  },
  mutations: {
    setAllJokes (state, jokes) {
      const ratedList = jokes.map((joke, index) => {
        if (joke.categories.length === 0) {
          joke.categories.push(CATEGORIES.UNCATEGORIZED)
        }

        joke['number'] = index + 1
        joke['likes'] = generateRating(0, 101)
        joke['dislikes'] = generateRating(0, 101)
        return joke
      })
      state.allJokes = ratedList
      state.filteredJokes = ratedList
      state.currentJokes = ratedList.slice(0, PAGE_LIMIT)
    },
    setCategories (state, categories) {
      if (!categories.includes(CATEGORIES.UNCATEGORIZED)) categories.push(CATEGORIES.UNCATEGORIZED)
      state.categories = [...new Set(categories)] // use Set to remove any possible duplicated category
    },
    setFilteredJokes (state, filteredJokes) {
      state.filteredJokes = filteredJokes
    },
    setCurrentJokes (state, newJokes) {
      state.currentJokes = newJokes
    },
    updateCurrentJokes (state, newJokes) {
      state.currentJokes.push(...newJokes)
    },
    updateCategories (state, category) {
      const categoryIndex = state.selectedCategories.indexOf(category)
      if (categoryIndex >= 0) {
        state.selectedCategories.splice(categoryIndex , 1)
      } else {
        state.selectedCategories.push(category)
      }
      state.filteredJokes = state.allJokes.filter(joke => joke.categories.every(category => state.selectedCategories.includes(category)) || state.selectedCategories.length == 0)
      state.currentJokes = state.filteredJokes.slice(0, PAGE_LIMIT)
    },
    upVoteJoke (state, joke) {
      joke.likes++
      const oldJoke = state.allJokes.find(oldJoke => oldJoke.id === joke.id)
      Object.assign(oldJoke, joke);
    },
    downVoteJoke (state, joke) {
      joke.dislikes++
      const oldJoke = state.allJokes.find(oldJoke => oldJoke.id === joke.id)
      Object.assign(oldJoke, joke);
    }
  },
  actions: {
    getAllJokes ({ commit }) {
      JokesService.getAllJokes()
        .then(response => commit('setAllJokes', response.data.result))
        .catch(console.error)
    },
    getCategories ({ commit }) {
      JokesService.getCategories()
        .then(response => commit('setCategories', response.data))
        .catch(console.error)
    },
    searchJokes ({ commit, state }, query) {
      const searchResults = state.allJokes.filter(joke => joke.value.toLowerCase().includes(query.toLowerCase()))
      commit('setFilteredJokes', searchResults)
      commit('setCurrentJokes', searchResults.slice(0, PAGE_LIMIT))
    },
    loadMoreJokes ({ commit, state }) {
      const newJokes = state.filteredJokes.slice(state.currentJokes.length, state.currentJokes.length + PAGE_LIMIT)
      commit('updateCurrentJokes', newJokes)
    },
    updateCategories({ commit }, category) {
      commit('updateCategories', category)
    },
    upVote({ commit }, joke) {
      commit('upVoteJoke', joke)
    },
    downVote({ commit }, joke) {
      commit('downVoteJoke', joke)
    }
  },
  getters: {
    getAllJokes: (state) => state.allJokes,
    getFilteredJokes: (state) => state.filteredJokes,
    getJokeById: (state) => (id) => {
      return state.allJokes.find(joke => joke.id === id)
    },
    getNextJokeId: (state) => (id) => {
      const index = state.allJokes.findIndex(joke => joke.id === id)
      return index + 1 === state.allJokes.length ? state.allJokes[0].id :  state.allJokes[index + 1].id
    },
    getPreviousJokeId: (state) => (id) => {
      const index = state.allJokes.findIndex(joke => joke.id === id)
      return index === 0 ? state.allJokes[state.allJokes.length - 1].id :  state.allJokes[index - 1].id
    },
    getAllCategories: (state) => state.categories,
    getSelectedCategories: (state) => state.selectedCategories,
    getCurrentJokes: (state) => state.currentJokes,
  },
}
