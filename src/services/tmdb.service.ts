import api from '@/lib/tmdb.axios'

export const tmdbService = {
  getPopular: async (page = 1) => {
    const response = await api.get(`/movie/popular`, {
      params: { page, language: 'pt-BR' },
    })
    return response.data
  },

  getDetails: async (id: number) => {
    const response = await api.get(`/movie/${id}`, {
      params: { language: 'pt-BR' },
    })
    return response.data
  },

  search: async (query: string, page = 1) => {
    const response = await api.get(`/search/movie`, {
      params: { query: encodeURIComponent(query), page, language: 'pt-BR' },
    })
    return response.data
  },

  addToFavorites: async (movieId: number, accountID: number) => {
    const response = await api.post(`/account/${accountID}/favorite`, {
      media_type: 'movie',
      media_id: movieId,
      favorite: true,
    })
    return response.data
  },

  removeFromFavorites: async (movieId: number, accountID: number) => {
    const response = await api.post(`/account/${accountID}/favorite`, {
      media_type: 'movie',
      media_id: movieId,
      favorite: false,
    })
    return response.data
  },

  getFavorites: async (accountID: number, page = 1, sortBy = 'created_at.desc') => {
    const response = await api.get(`/account/${accountID}/favorite/movies`, {
      params: { language: 'pt-BR', page, sort_by: sortBy },
    })
    return response.data
  },
}
