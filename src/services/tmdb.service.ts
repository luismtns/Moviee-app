import api from '@/lib/tmdb.axios'

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
