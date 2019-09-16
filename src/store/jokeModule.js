import JokesService from '../services/jokesService'
import { generateRating, generateColorsArray } from '../shared/utils'
import { CATEGORIES, PAGE_LIMIT } from '../shared/constants'

export default {
  namespaced: true,
  state: {
    allJokes: [],
    currentJokes: [],
    categories: [],
    selectedCategories: [],
    searchQuery: '',
    loadingJokes: true,
    loadingJokesError: false,
    loadingCategories: true,
    loadingCategoriesError: false,
  },
  mutations: {
    setAllJokes (state, jokes) {
      // Add a random quantity of likes & dislikes to the Joke given that they are not provided via Api
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

      const colorsList = generateColorsArray(categories.length);

      categories.forEach(function(categoryName, i) {
        state.categories.push( { name: categoryName, color: colorsList[i]})
      });
    },
    setCurrentJokes (state, newJokes) { state.currentJokes = newJokes },
    updateCurrentJokes (state, newJokes) { state.currentJokes.push(...newJokes) },
    setSearchQuery (state, query) { state.searchQuery = query },
    loadingJokes(state, loading) { state.loadingJokes = loading },
    loadingCategories(state, loading) { state.loadingCategories = loading },
    updateCategories (state, selectedCategory) {
      const categoryIndex = state.selectedCategories.indexOf(selectedCategory)
      if (categoryIndex >= 0) {
        state.selectedCategories.splice(categoryIndex , 1)
      } else {
        state.selectedCategories.push(selectedCategory)
      }

      // Find all jokes that have at least one category included in the list of selected categories
      const filteredJokes = state.allJokes.filter(joke =>
                            joke.categories.some(jokeCategory =>
                            state.selectedCategories.some(category => category.name === jokeCategory))
                            || state.selectedCategories.length == 0)
      state.currentJokes = filteredJokes.slice(0, PAGE_LIMIT)
    },
    updateJokeRating (state, { joke, isThumbsUp }) {
      if (isThumbsUp) joke.likes++
      else joke.dislikes++

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
    updateJokeRating({ commit }, payload) { commit('updateJokeRating', payload)} },
  getters: {
    getAllJokes: (state) => state.allJokes,
    getJokeById: (state) => (id) => { return state.allJokes.find(joke => joke.id === id) },
    getNextJokeId: (state) => (number) => {
      if (number === state.allJokes.length)
        return state.allJokes.find(joke => joke.number === 1).id

      return state.allJokes.find(joke => joke.number === number + 1).id
    },
    getPreviousJokeId: (state) => (number) => {
      if (number === 1)
        return state.allJokes.find(joke => joke.number === state.allJokes.length).id

        return state.allJokes.find(joke => joke.number === number - 1).id
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
