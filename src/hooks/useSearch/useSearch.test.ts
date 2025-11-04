import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useSearch } from './useSearch'

vi.mock('@/stores/searchStore', () => ({
  useSearchStore: vi.fn(() => ({
    searchQuery: '',
    setSearchQuery: vi.fn(),
  })),
}))

vi.mock('@ionic/react', () => ({
  useIonRouter: vi.fn(() => ({
    canGoBack: vi.fn(() => true),
  })),
}))

vi.mock('react-router-dom', () => ({
  useHistory: vi.fn(() => ({ push: vi.fn() })),
  useLocation: vi.fn(() => ({ search: '', pathname: '/' })),
}))

describe('useSearch', () => {
  it('returns search state and methods', () => {
    const { result } = renderHook(() => useSearch())

    expect(result.current).toHaveProperty('searchQuery')
    expect(result.current).toHaveProperty('updateSearch')
    expect(result.current).toHaveProperty('clearSearch')
    expect(result.current).toHaveProperty('navigateToSearch')
  })
})
