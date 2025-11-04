import { describe, expect, it, vi } from 'vitest'

const mockUseInfiniteQuery = vi.fn(() => ({ data: null, isLoading: false }))
const mockUseQuery = vi.fn(() => ({ data: null, isLoading: false }))

vi.mock('@tanstack/react-query', () => ({
  useInfiniteQuery: mockUseInfiniteQuery,
  useQuery: mockUseQuery,
}))

vi.mock('@/stores/authStore', () => ({
  useAuthStore: vi.fn(() => ({ sessionId: 'test', accountId: 123, isAuthenticated: true })),
}))

vi.mock('@/services/tmdb.service')

describe('useMovies', () => {
  it('hooks call react query correctly', async () => {
    const { usePopularMovies, useMovieDetails, useSearchMovies } = await import('./useMovies')

    usePopularMovies()
    expect(mockUseInfiniteQuery).toHaveBeenCalled()

    useMovieDetails(1)
    expect(mockUseQuery).toHaveBeenCalled()

    useSearchMovies('test', true)
    expect(mockUseInfiniteQuery).toHaveBeenCalled()
  })
})
