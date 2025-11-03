import { useSearchStore } from '@/stores/searchStore'
import { render } from '@testing-library/react'
import { vi } from 'vitest'
import { SearchBar } from './SearchBar'

vi.mock('@/stores/searchStore', () => ({
  useSearchStore: vi.fn(),
}))

const mockStore = vi.mocked(useSearchStore)

describe('SearchBar', () => {
  beforeEach(() => {
    mockStore.mockReturnValue({
      searchTerm: '',
      isSearching: false,
      searchResults: [],
      setSearchTerm: vi.fn(),
      setIsSearching: vi.fn(),
      setSearchResults: vi.fn(),
      clearSearch: vi.fn(),
    })
  })

  it('renders ion-searchbar', () => {
    const { container } = render(<SearchBar />)

    const searchbar = container.querySelector('ion-searchbar')
    expect(searchbar?.getAttribute('placeholder')).toBe('Buscar Filmes...')
  })
})
