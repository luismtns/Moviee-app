import { useAuthStore } from '@/stores/authStore'
import { useFavoritesStore } from '@/stores/favoritesStore'

export const useFavorites = () => {
  const { guestSessionId } = useAuthStore()
  const {
    favoriteIds,
    isLoading,
    toggleFavorite,
    isFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
    getFavoritesCount,
  } = useFavoritesStore()

  return {
    favoriteIds,
    favoritesCount: getFavoritesCount(),
    isLoading,
    isFavorite,
    toggleFavorite: (movieId: number) => (guestSessionId ? toggleFavorite(movieId, guestSessionId) : Promise.resolve()),
    addFavorite: (movieId: number) => (guestSessionId ? addFavorite(movieId, guestSessionId) : Promise.resolve()),
    removeFavorite: (movieId: number) => (guestSessionId ? removeFavorite(movieId, guestSessionId) : Promise.resolve()),
    clearFavorites,
    canUseFavorites: !!guestSessionId,
  }
}
