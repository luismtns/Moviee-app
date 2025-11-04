import { describe, expect, it, vi } from 'vitest'
import { useMovieDetails, usePopularMovies, useSearchMovies } from './useMovies'

vi.mock('@/services/tmdb.service', () => ({
  tmdbService: {
    getPopular: vi.fn(() => Promise.resolve({ results: [], page: 1, total_pages: 1 })),
    getDetails: vi.fn(() => Promise.resolve({ id: 1, title: 'Test Movie' })),
    search: vi.fn(() => Promise.resolve({ results: [], page: 1, total_pages: 1 })),
    getFavorites: vi.fn(() => Promise.resolve({ results: [], page: 1, total_pages: 1 })),
  },
}))

vi.mock('@/hooks/useFavorites', () => ({
  useFavorites: vi.fn(() => ({ favoriteIds: [] })),
}))

vi.mock('@/stores/authStore', () => ({
  useAuthStore: vi.fn(() => ({ guestSessionId: 'test', isAuthenticated: true })),
}))

vi.mock('@tanstack/react-query', () => ({
  useInfiniteQuery: vi.fn(() => ({ data: null, isLoading: false })),
  useQuery: vi.fn(() => ({ data: null, isLoading: false })),
}))

describe('useMovies', () => {
  it('usePopularMovies returns query result', () => {
    const result = usePopularMovies()
    expect(result).toBeTruthy()
  })

  it('useMovieDetails returns query result', () => {
    const result = useMovieDetails(1)
    expect(result).toBeTruthy()
  })

  it('useSearchMovies returns query result', () => {
    const result = useSearchMovies('test', true)
    expect(result).toBeTruthy()
  })
})
