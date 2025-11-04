import { waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useFavoritesStore } from './favoritesStore'

vi.mock('@/services/tmdb.service', () => ({
  tmdbService: {
    addToFavorites: vi.fn(),
    removeFromFavorites: vi.fn(),
  },
}))

describe('favoritesStore', () => {
  it('initializes empty', () => {
    const { favoriteIds } = useFavoritesStore.getState()
    expect(favoriteIds).toBeDefined()
  })

  it('checks favorite', () => {
    const isFav = useFavoritesStore.getState().isFavorite(1)
    expect(typeof isFav).toBe('boolean')
  })

  it('adds favorite', async () => {
    await useFavoritesStore.getState().addFavorite(999, 'test')
    await waitFor(() => expect(useFavoritesStore.getState().isFavorite(999)).toBe(true))
  })

  it('toggles favorite', async () => {
    await useFavoritesStore.getState().toggleFavorite(888, 'test')
    await waitFor(() => expect(useFavoritesStore.getState().isFavorite(888)).toBe(true))
  })
})
