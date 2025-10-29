import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesStore {
  favoriteIds: number[]
  toggleFavorite: (movieId: number) => void
  isFavorite: (movieId: number) => boolean
  addFavorite: (movieId: number) => void
  removeFavorite: (movieId: number) => void
  clearFavorites: () => void
  getFavoritesCount: () => number
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      toggleFavorite: (movieId) => {
        set((state) => {
          const exists = state.favoriteIds.includes(movieId)
          return {
            favoriteIds: exists ? state.favoriteIds.filter((id) => id !== movieId) : [...state.favoriteIds, movieId],
          }
        })
      },

      isFavorite: (movieId) => {
        return get().favoriteIds.includes(movieId)
      },

      addFavorite: (movieId) => {
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(movieId) ? state.favoriteIds : [...state.favoriteIds, movieId],
        }))
      },

      removeFavorite: (movieId) => {
        set((state) => ({
          favoriteIds: state.favoriteIds.filter((id) => id !== movieId),
        }))
      },

      clearFavorites: () => {
        set({ favoriteIds: [] })
      },

      getFavoritesCount: () => {
        return get().favoriteIds.length
      },
    }),
    {
      name: 'moviee-favorites',
    }
  )
)
