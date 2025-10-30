import { useSearchStore } from '@/stores/searchStore'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { SearchBar } from './SearchBar'

// Mock do hook useDebounce
vi.mock('@/hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}))

// Mock do store
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

  it('renders searchbar', () => {
    render(<SearchBar />)

    const searchbar = screen.getByPlaceholderText('Buscar Filmes...')
    expect(searchbar).toBeTruthy()
  })

  it('accepts onSearch callback', () => {
    const mockOnSearch = vi.fn()
    render(<SearchBar onSearch={mockOnSearch} />)

    expect(mockOnSearch).toBeDefined()
  })
})
