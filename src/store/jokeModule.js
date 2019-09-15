import JokesService from '../services/jokesService'
import { generateRating } from '../shared/utils'
import { CATEGORIES, PAGE_LIMIT } from '../shared/constants'

export default {
  namespaced: true,
  state: {
    allJokes: [],
    currentJokes: [],
    categories: [],
    selectedCategories: [],
    searchQuery: '',
    selectedJoke: null,
    loadingJokes: true,
    loadingJokesError: false,
    loadingCategories: true,
    loadingCategoriesError: false,
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
      state.currentJokes = ratedList.slice(0, PAGE_LIMIT)
    },
    setCategories (state, categories) {
      if (!categories.includes(CATEGORIES.UNCATEGORIZED)) categories.push(CATEGORIES.UNCATEGORIZED)
      state.categories = [...new Set(categories)] // use Set to remove any possible duplicated category
    },
    setCurrentJokes (state, newJokes) { state.currentJokes = newJokes },
    updateCurrentJokes (state, newJokes) { state.currentJokes.push(...newJokes) },
    setSearchQuery (state, query) { state.searchQuery = query },
    loadingJokes(state, loading) { state.loadingJokes = loading },
    loadingCategories(state, loading) { state.loadingCategories = loading },
    updateCategories (state, category) {
      const categoryIndex = state.selectedCategories.indexOf(category)
      if (categoryIndex >= 0) {
        state.selectedCategories.splice(categoryIndex , 1)
      } else {
        state.selectedCategories.push(category)
      }
      const filteredJokes = state.allJokes.filter(joke => joke.categories.every(category => state.selectedCategories.includes(category)) || state.selectedCategories.length == 0)
      state.currentJokes = filteredJokes.slice(0, PAGE_LIMIT)
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
    },
    setJokeError (state, error) { state.loadingJokesError = error },
    setCategoryError (state, error) { state.loadingCategoriesError = error },
  },
  actions: {
    getAllJokes ({ commit }) {
      commit('setJokeError', false)
      commit('loadingJokes', true)
      JokesService.getAllJokes()
        .then(response => {
          commit('setAllJokes', response.data.result)
          commit('loadingJokes', false)
        })
        .catch(() => { commit('setJokeError', true) })
    },
    getCategories ({ commit }) {
      commit('setCategoryError', false)
      commit('loadingCategories', true)
      JokesService.getCategories()
        .then(response => {
          commit('setCategories', response.data)
          commit('loadingCategories', false)
        })
        .catch(() => { commit('setCategoryError', true) })
    },
    searchJokes ({ commit, state }, query) {
      commit('setSearchQuery', query)
      const searchResults = state.allJokes.filter(joke => joke.value.toLowerCase().includes(query.toLowerCase()))
      commit('setCurrentJokes', searchResults.slice(0, PAGE_LIMIT))
    },
    loadMoreJokes ({ commit, state }) {
      const newJokes = state.allJokes.slice(state.currentJokes.length, state.currentJokes.length + PAGE_LIMIT)
      commit('updateCurrentJokes', newJokes)
    },
    updateCategories({ commit }, category) { commit('updateCategories', category) },
    upVote({ commit }, joke) { commit('upVoteJoke', joke) },
    downVote({ commit }, joke) { commit('downVoteJoke', joke) }
  },
  getters: {
    getAllJokes: (state) => state.allJokes,
    getJokeById: (state) => (id) => { return state.allJokes.find(joke => joke.id === id) },
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
    getTopJokes: (state) => {
      const sortedJokes = state.allJokes.sort((jokeA, jokeB) => jokeA.likes > jokeB.likes ? -1 : 1)
      return sortedJokes.slice(0, 10)
    },
    jokesLoading: (state) => state.loadingJokes,
    jokesLoadingError: (state) => state.loadingJokesError,
    categoriesLoading: (state) => state.loadingCategories,
    categoriesLoadingError: (state) => state.loadingCategoriesError,
  },
}
