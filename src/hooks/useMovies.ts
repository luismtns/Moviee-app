import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { tmdbService } from '../services/tmdb.service'
import type { MovieDetails, MoviesResponse } from '../types/Movie'

// Hook para filmes populares com infinite scroll
export const usePopularMovies = () => {
  return useInfiniteQuery<MoviesResponse, Error>({
    queryKey: ['movies', 'popular'],
    queryFn: ({ pageParam = 1 }) => tmdbService.getPopular(pageParam as number),
    getNextPageParam: (lastPage: MoviesResponse) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutos cache
    refetchOnWindowFocus: true,
  })
}

// Hook para detalhes de um filme
export const useMovieDetails = (movieId: number) => {
  return useQuery<MovieDetails, Error>({
    queryKey: ['movie', 'details', movieId],
    queryFn: () => tmdbService.getDetails(movieId),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutos cache
  })
}

// Hook para buscar filmes
export const useSearchMovies = (query: string, enabled: boolean = true) => {
  return useInfiniteQuery<MoviesResponse, Error>({
    queryKey: ['movies', 'search', query],
    queryFn: ({ pageParam = 1 }) => tmdbService.search(query, pageParam as number),
    getNextPageParam: (lastPage: MoviesResponse) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    enabled: enabled && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutos cache para busca
  })
}
