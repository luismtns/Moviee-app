import { useSearchStore } from '@/stores/searchStore'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { Header } from './Header'

vi.mock('react-router-dom', () => ({
  useHistory: () => ({ push: vi.fn() }),
  useLocation: () => ({ pathname: '/' }),
}))

vi.mock('@/stores/searchStore')
vi.mock('@/hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}))

const mockSearchStore = vi.mocked(useSearchStore)

describe('Header', () => {
  beforeEach(() => {
    mockSearchStore.mockReturnValue({
      searchTerm: '',
      isSearching: false,
      searchResults: [],
      setSearchTerm: vi.fn(),
      setIsSearching: vi.fn(),
      setSearchResults: vi.fn(),
      clearSearch: vi.fn(),
    })
  })

  it('renders header with logo', () => {
    render(<Header />)

    expect(screen.getByText('Moviee')).toBeTruthy()
  })

  it('shows search when enabled', () => {
    render(<Header showSearch={true} />)

    const searchbar = screen.getByPlaceholderText('Buscar Filmes...')
    expect(searchbar).toBeTruthy()
  })

  it('hides search when disabled', () => {
    render(<Header showSearch={false} />)

    const searchbar = screen.queryByPlaceholderText('Buscar Filmes...')
    expect(searchbar).toBeFalsy()
  })
})
