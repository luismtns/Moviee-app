import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

const mockPush = vi.fn()
const mockSetSearchQuery = vi.fn()
const mockCanGoBack = vi.fn(() => true)

vi.mock('@/stores/searchStore', () => ({
  useSearchStore: () => ({
    searchQuery: '',
    setSearchQuery: mockSetSearchQuery,
  }),
}))

vi.mock('@ionic/react', () => ({
  useIonRouter: () => ({
    canGoBack: mockCanGoBack,
  }),
  setupIonicReact: vi.fn(),
}))

vi.mock('react-router-dom', () => ({
  useHistory: () => ({ push: mockPush }),
  useLocation: () => ({ search: '', pathname: '/' }),
}))

describe('useSearch', () => {
  it('returns search data', async () => {
    const { useSearch } = await import('./useSearch')
    const { result } = renderHook(() => useSearch())
    expect(result.current.searchQuery).toBe('')
  })
})
