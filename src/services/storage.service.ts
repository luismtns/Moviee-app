// Storage Service para favoritos
export const storageService = {
  getFavorites: (): number[] => {
    try {
      const stored = localStorage.getItem('moviee-favorites')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  },

  saveFavorites: (ids: number[]): void => {
    try {
      localStorage.setItem('moviee-favorites', JSON.stringify(ids))
    } catch (error) {
      console.warn('Failed to save favorites:', error)
    }
  },

  addFavorite: (movieId: number): void => {
    const favorites = storageService.getFavorites()
    if (!favorites.includes(movieId)) {
      favorites.push(movieId)
      storageService.saveFavorites(favorites)
    }
  },

  removeFavorite: (movieId: number): void => {
    const favorites = storageService.getFavorites()
    const updated = favorites.filter((id) => id !== movieId)
    storageService.saveFavorites(updated)
  },

  isFavorite: (movieId: number): boolean => {
    return storageService.getFavorites().includes(movieId)
  },

  clearFavorites: (): void => {
    localStorage.removeItem('moviee-favorites')
  },
}
