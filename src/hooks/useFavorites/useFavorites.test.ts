import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useFavorites } from './useFavorites'

vi.mock('@/stores/authStore', () => ({
  useAuthStore: vi.fn(() => ({ guestSessionId: 'test-session' })),
}))

vi.mock('@/stores/favoritesStore', () => ({
  useFavoritesStore: vi.fn(() => ({
    favoriteIds: [1, 2, 3],
    isLoading: false,
    toggleFavorite: vi.fn(),
    isFavorite: vi.fn(),
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
    clearFavorites: vi.fn(),
    getFavoritesCount: vi.fn(() => 3),
  })),
}))

describe('useFavorites', () => {
  it('returns favorites state and methods', () => {
    const { result } = renderHook(() => useFavorites())

    expect(result.current.favoriteIds).toEqual([1, 2, 3])
    expect(result.current.favoritesCount).toBe(3)
    expect(result.current.canUseFavorites).toBe(true)
  })
})
