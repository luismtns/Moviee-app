import { createUnifiedStorage } from '@/lib/storage.factory'
import { tmdbService } from '@/services/tmdb.service'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface FavoritesStore {
  favoriteIds: number[]
  isLoading: boolean
  toggleFavorite: (movieId: number, guestSessionId: string) => Promise<void>
  isFavorite: (movieId: number) => boolean
  addFavorite: (movieId: number, guestSessionId: string) => Promise<void>
  removeFavorite: (movieId: number, guestSessionId: string) => Promise<void>
  clearFavorites: () => void
  getFavoritesCount: () => number
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      isLoading: false,

      toggleFavorite: async (movieId, guestSessionId) => {
        const exists = get().favoriteIds.includes(movieId)

        // Otimalistic update
        if (exists) {
          set((state) => ({
            favoriteIds: state.favoriteIds.filter((id) => id !== movieId),
          }))
        } else {
          set((state) => ({
            favoriteIds: [...state.favoriteIds, movieId],
          }))
        }

        // Request em background
        try {
          if (exists) {
            await tmdbService.removeFromFavorites(movieId, guestSessionId)
          } else {
            await tmdbService.addToFavorites(movieId, guestSessionId)
          }
        } catch (error) {
          console.error('Error toggling favorite:', error)
          if (exists) {
            set((state) => ({
              favoriteIds: [...state.favoriteIds, movieId],
            }))
          } else {
            set((state) => ({
              favoriteIds: state.favoriteIds.filter((id) => id !== movieId),
            }))
          }
          throw error
        }
      },

      isFavorite: (movieId) => get().favoriteIds.includes(movieId),

      addFavorite: async (movieId, guestSessionId) => {
        if (get().favoriteIds.includes(movieId)) return

        // Otimalistic update
        set((state) => ({
          favoriteIds: [...state.favoriteIds, movieId],
        }))

        // Background request
        try {
          await tmdbService.addToFavorites(movieId, guestSessionId)
        } catch (error) {
          set((state) => ({
            favoriteIds: state.favoriteIds.filter((id) => id !== movieId),
          }))
          console.error('Error adding favorite:', error)
          throw error
        }
      },

      removeFavorite: async (movieId, guestSessionId) => {
        // Otimalistic update
        set((state) => ({
          favoriteIds: state.favoriteIds.filter((id) => id !== movieId),
        }))

        // Background request
        try {
          await tmdbService.removeFromFavorites(movieId, guestSessionId)
        } catch (error) {
          set((state) => ({
            favoriteIds: [...state.favoriteIds, movieId],
          }))
          console.error('Error removing favorite:', error)
          throw error
        }
      },

      clearFavorites: () => set({ favoriteIds: [] }),

      getFavoritesCount: () => get().favoriteIds.length,
    }),
    {
      name: 'moviee-favorites',
      storage: createJSONStorage(() => createUnifiedStorage()),
    }
  )
)
