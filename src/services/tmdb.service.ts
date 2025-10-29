import axios from 'axios'

// TMDB API Client
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor para auth
api.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_TMDB_API_V3_KEY
  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`
  }
  return config
})

// Response interceptor para erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.status_message || error.message
    return Promise.reject(new Error(message))
  }
)

// TMDB Service
export const tmdbService = {
  getPopular: async (page = 1) => {
    const response = await api.get(`/movie/popular?page=${page}`)
    return response.data
  },
  getDetails: async (id: number) => {
    const response = await api.get(`/movie/${id}`)
    return response.data
  },
  search: async (query: string, page = 1) => {
    const response = await api.get(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`)
    return response.data
  },
}
