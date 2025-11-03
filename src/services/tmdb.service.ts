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

  rateMovie: async (movieId: number, rating: number, guestSessionId: string) => {
    const response = await api.post(
      `/movie/${movieId}/rating`,
      { value: rating },
      { params: { guest_session_id: guestSessionId } }
    )
    return response.data
  },

  deleteRating: async (movieId: number, guestSessionId: string) => {
    const response = await api.delete(`/movie/${movieId}/rating`, {
      params: { guest_session_id: guestSessionId }
    })
    return response.data
  },

  addToFavorites: async (movieId: number, guestSessionId: string) => {
    const response = await api.post(
      `/guest_session/${guestSessionId}/rated/movies`,
      { media_type: 'movie', media_id: movieId, favorite: true }
    )
    return response.data
  },

  removeFromFavorites: async (movieId: number, guestSessionId: string) => {
    const response = await api.post(
      `/guest_session/${guestSessionId}/rated/movies`,
      { media_type: 'movie', media_id: movieId, favorite: false }
    )
    return response.data
  },

  getFavorites: async (guestSessionId: string, page = 1) => {
    const response = await api.get(`/guest_session/${guestSessionId}/rated/movies?page=${page}`)
    return response.data
  },

  getRatedMovies: async (guestSessionId: string, page = 1) => {
    const response = await api.get(`/guest_session/${guestSessionId}/rated/movies?page=${page}`)
    return response.data
  }
}
