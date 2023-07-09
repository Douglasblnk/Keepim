import Axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'

function getApiUrl() {
  return isProduction
    ? `https://api.${window.location.hostname.slice(8)}`
    : 'http://localhost:3000/dev'
}

const instance = Axios.create({
  baseURL: `${getApiUrl()}`,
})

export default instance
