import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useFavorites } from './useFavorites'

const mockToggleFavorite = vi.fn()
const mockAddFavorite = vi.fn()
const mockRemoveFavorite = vi.fn()

vi.mock('@/stores/authStore', () => ({
  useAuthStore: vi.fn(() => ({ guestSessionId: 'test-session' })),
}))

vi.mock('@/stores/favoritesStore', () => ({
  useFavoritesStore: vi.fn(() => ({
    favoriteIds: [1, 2, 3],
    isLoading: false,
    toggleFavorite: mockToggleFavorite,
    isFavorite: vi.fn(),
    addFavorite: mockAddFavorite,
    removeFavorite: mockRemoveFavorite,
    clearFavorites: vi.fn(),
    getFavoritesCount: vi.fn(() => 3),
  })),
}))

describe('useFavorites', () => {
  it('returns favorites data', () => {
    const { result } = renderHook(() => useFavorites())
    expect(result.current.favoriteIds).toEqual([1, 2, 3])
    expect(result.current.favoritesCount).toBe(3)
  })

  it('calls toggleFavorite', async () => {
    const { result } = renderHook(() => useFavorites())
    await result.current.toggleFavorite(1)
    expect(mockToggleFavorite).toHaveBeenCalledWith(1, 'test-session')
  })

  it('calls addFavorite', async () => {
    const { result } = renderHook(() => useFavorites())
    await result.current.addFavorite(1)
    expect(mockAddFavorite).toHaveBeenCalledWith(1, 'test-session')
  })
})
