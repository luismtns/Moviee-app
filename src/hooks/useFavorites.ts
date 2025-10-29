import { useFavoritesStore } from '../stores/favoritesStore'

// Hook simplificado para favoritos usando Zustand
export const useFavorites = () => {
  const { favoriteIds, toggleFavorite, isFavorite, addFavorite, removeFavorite, clearFavorites, getFavoritesCount } =
    useFavoritesStore()

  return {
    favoriteIds,
    favoritesCount: getFavoritesCount(),
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
  }
}
