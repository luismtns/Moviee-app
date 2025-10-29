import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_V3_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

if (!API_KEY) {
  throw new Error('TMDB API key is not defined in environment variables.')
}
if (!BASE_URL) {
  throw new Error('TMDB API base URL is not defined in environment variables.')
}

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${API_KEY}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.status_message || error.message
    return Promise.reject(new Error(message))
  }
)

export default api
