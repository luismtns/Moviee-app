import { tmdbService } from '@/services/tmdb.service'
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
  return useQuery<MovieDetails, Error>({
    queryKey: ['movie', 'details', movieId],
    queryFn: () => tmdbService.getDetails(movieId),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1_000,
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
