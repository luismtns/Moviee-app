import api from '@/lib/tmdb.axios'

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

  addToFavorites: async (movieId: number, guestSessionId: string) => {
    const response = await api.post(`/account/${guestSessionId}/favorite`, {
      media_type: 'movie',
      media_id: movieId,
      favorite: true,
    })
    return response.data
  },

  removeFromFavorites: async (movieId: number, guestSessionId: string) => {
    const response = await api.post(`/account/${guestSessionId}/favorite`, {
      media_type: 'movie',
      media_id: movieId,
      favorite: false,
    })
    return response.data
  },

  getFavorites: async (guestSessionId: string, page = 1) => {
    const response = await api.get(`/account/${guestSessionId}/favorite/movies?page=${page}`)
    return response.data
  },
}
