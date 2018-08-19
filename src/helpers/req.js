import axios from 'axios'

export default axios.create({
  baseURL:
    'https://cors-anywhere.herokuapp.com/http://finalfantasy.wikia.com/api/v1/',
  headers: {
    'X-Requested-With': 'axios'
  }
})
