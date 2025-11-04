import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useSearch } from './useSearch'

const mockPush = vi.fn()
const mockSetSearchQuery = vi.fn()

vi.mock('@/stores/searchStore', () => ({
  useSearchStore: vi.fn(() => ({
    searchQuery: '',
    setSearchQuery: mockSetSearchQuery,
  })),
}))

vi.mock('@ionic/react', () => ({
  useIonRouter: vi.fn(() => ({
    canGoBack: vi.fn(() => true),
  })),
}))

vi.mock('react-router-dom', () => ({
  useHistory: vi.fn(() => ({ push: mockPush })),
  useLocation: vi.fn(() => ({ search: '', pathname: '/' })),
}))

describe('useSearch', () => {
  it('returns search data', () => {
    const { result } = renderHook(() => useSearch())
    expect(result.current.searchQuery).toBe('')
  })

  it('calls updateSearch', () => {
    const { result } = renderHook(() => useSearch())
    result.current.updateSearch('test')
    expect(mockSetSearchQuery).toHaveBeenCalledWith('test')
    expect(mockPush).toHaveBeenCalledWith('/search?q=test')
  })

  it('calls clearSearch', () => {
    const { result } = renderHook(() => useSearch())
    result.current.clearSearch()
    expect(mockSetSearchQuery).toHaveBeenCalledWith('')
    expect(mockPush).toHaveBeenCalledWith('/')
  })
})
