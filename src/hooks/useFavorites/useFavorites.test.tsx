import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { type ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { useFavorites } from './useFavorites'

vi.mock('@/stores/authStore', () => ({
  useAuthStore: vi.fn(() => ({ accountId: 123, isAuthenticated: true })),
}))

vi.mock('@/stores/favoritesStore', () => ({
  useFavoritesStore: vi.fn(() => ({
    sync: vi.fn(),
    has: vi.fn(() => false),
  })),
}))

vi.mock('../useMovies', () => ({
  useFavoriteMovies: vi.fn(() => ({ data: null })),
}))

const queryClient = new QueryClient()

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useFavorites', () => {
  it('returns functions', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })
    expect(result.current.isFavorite).toBeDefined()
    expect(result.current.toggleFavorite).toBeDefined()
    expect(result.current.canUseFavorites).toBe(true)
  })
})
