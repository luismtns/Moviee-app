import { describe, expect, it } from 'vitest'
import { useSearchStore } from './searchStore'

describe('searchStore', () => {
  it('initializes empty', () => {
    const { searchQuery } = useSearchStore.getState()
    expect(searchQuery).toBe('')
  })

  it('sets query', () => {
    useSearchStore.getState().setSearchQuery('test')
    expect(useSearchStore.getState().searchQuery).toBe('test')
  })

  it('clears query', () => {
    useSearchStore.getState().clearSearch()
    expect(useSearchStore.getState().searchQuery).toBe('')
  })
})
