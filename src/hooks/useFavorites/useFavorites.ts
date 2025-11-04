import { tmdbService } from '@/services/tmdb.service'
import { useAuthStore } from '@/stores/authStore'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useFavoriteMovies } from '../useMovies'

export const useFavorites = () => {
  const { accountId, isAuthenticated } = useAuthStore()
  const { sync, has } = useFavoritesStore()
  const { data } = useFavoriteMovies('created_at.desc')
  const queryClient = useQueryClient()

  useEffect(() => {
    if (data?.pages) {
      const ids = data.pages.flatMap((page) => page.results.map((m) => m.id))
      sync(ids)
    }
  }, [data, sync])

  const toggleFavorite = async (movieId: number) => {
    if (!accountId || !isAuthenticated) return

    const isFav = has(movieId)

    if (isFav) {
      await tmdbService.removeFromFavorites(movieId, accountId)
    } else {
      await tmdbService.addToFavorites(movieId, accountId)
    }

    await queryClient.invalidateQueries({ queryKey: ['movies', 'favorites'] })
  }

  return {
    isFavorite: has,
    toggleFavorite,
    canUseFavorites: isAuthenticated && !!accountId,
  }
}
