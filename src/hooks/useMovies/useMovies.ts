import { tmdbService } from '@/services/tmdb.service'
import { useAuthStore } from '@/stores/authStore'
import type { MovieDetails, MoviesResponse } from '@/types/Movie'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export const usePopularMovies = () => {
  return useInfiniteQuery<MoviesResponse, Error>({
    queryKey: ['movies', 'popular'],
    queryFn: ({ pageParam = 1 }) => tmdbService.getPopular(pageParam as number),
    getNextPageParam: (lastPage: MoviesResponse) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1_000,
    refetchOnWindowFocus: true,
  })
}

export const useMovieDetails = (movieId: number) => {
  const { sessionId } = useAuthStore()

  return useQuery<MovieDetails, Error>({
    queryKey: ['movie', 'details', movieId, sessionId],
    queryFn: () => tmdbService.getDetails(movieId),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1_000,
  })
}

export const useFavoriteMovies = (sortBy: string = 'created_at.desc') => {
  const { accountId, sessionId } = useAuthStore()

  return useInfiniteQuery<MoviesResponse, Error>({
    queryKey: ['movies', 'favorites', accountId, sortBy],
    queryFn: ({ pageParam = 1 }) => {
      if (!accountId) throw new Error('Not authenticated')
      return tmdbService.getFavorites(accountId, pageParam as number, sortBy)
    },
    getNextPageParam: (lastPage: MoviesResponse) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!accountId && !!sessionId,
    staleTime: 1 * 60 * 1_000,
    refetchOnWindowFocus: true,
  })
}

export const useSearchMovies = (query: string, enabled: boolean = true) => {
  return useInfiniteQuery<MoviesResponse, Error>({
    queryKey: ['movies', 'search', query],
    queryFn: ({ pageParam = 1 }) => tmdbService.search(query, pageParam as number),
    getNextPageParam: (lastPage: MoviesResponse) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    enabled: enabled && query.length > 2,
    staleTime: 2 * 60 * 1000,
  })
}
