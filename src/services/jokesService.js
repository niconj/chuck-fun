import axios from 'axios'
import axiosRetry from 'axios-retry'
import { URL } from '../shared/constants'

axiosRetry(axios, { retries: 3 })

const baseConfig = Object.freeze({
  baseURL: URL.CHUCKAPI,
  timeout: URL.TIMEOUT
})

class JokesService {
  constructor () {
    this.base = axios.create(baseConfig)
  }

  async getOrFollowArticle (id) {
    try {
      const article = await this.getArticle(id)
      return article
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return this.followArticle(id).then(res => ({ ...res, justFollowed: true }))
      }
      throw err
    }
  }

  getMlArticle (id) {
    return this.base.get(`/articles/ml/${id}`)
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
