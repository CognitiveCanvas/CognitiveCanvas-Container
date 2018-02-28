import Axios from 'axios'
import router from '../router/index'

const API = `http://${window.location.hostname}:8081`

export default {
  queryContent(label) {
    Axios.get(`${API}/queryContent`, {
      params: {
        label: label
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}