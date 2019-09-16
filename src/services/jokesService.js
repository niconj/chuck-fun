import axios from 'axios'
import { URL } from '../shared/constants'
import axiosRetry from 'axios-retry'

const baseConfig = Object.freeze({
  baseURL: URL.CHUCKAPI,
  timeout: URL.TIMEOUT
})

class JokesService {
  constructor () {
    this.base = axios.create(baseConfig)

    axiosRetry(this.base, {
      retries: 3,
      shouldResetTimeout: true,
      retryCondition: (error) => error.code === 'ECONNABORTED',
    });
  }

  getPaginatedArticles (params) {
    return this.base.get('/articles', { params })
  }

  getCategories () {
    return this.base.get('jokes/categories')
  }

  getAllJokes () {
    return this.base.get('/jokes/search?query=all')
  }

  searchJoke (query) {
    return this.base.get('/jokes,', { query })
  }
}

export default new JokesService()
