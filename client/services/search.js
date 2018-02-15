import api from './api.js'

export default {
  fetchKeywordSearchResult() {
    return api().get('searchKeyword');
  }
}