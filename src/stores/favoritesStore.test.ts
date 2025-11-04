import { beforeEach, describe, expect, it } from 'vitest'
import { useFavoritesStore } from './favoritesStore'

describe('favoritesStore', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favoriteIds: new Set() })
  })

  it('syncs favorites from array', () => {
    useFavoritesStore.getState().sync([1, 2, 3])
    expect(useFavoritesStore.getState().has(1)).toBe(true)
    expect(useFavoritesStore.getState().has(2)).toBe(true)
    expect(useFavoritesStore.getState().has(3)).toBe(true)
  })

  it('checks if movie is favorite', () => {
    useFavoritesStore.getState().sync([1, 2])
    expect(useFavoritesStore.getState().has(1)).toBe(true)
    expect(useFavoritesStore.getState().has(999)).toBe(false)
  })

  it('clears all favorites', () => {
    useFavoritesStore.getState().sync([1, 2, 3])
    useFavoritesStore.getState().clear()
    expect(useFavoritesStore.getState().has(1)).toBe(false)
    expect(useFavoritesStore.getState().has(2)).toBe(false)
  })
})
