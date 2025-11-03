import { useSearchStore } from '@/stores/searchStore'
import { render } from '@testing-library/react'
import { vi } from 'vitest'
import Header from './Header'

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

  it('renders ion-header structure', () => {
    const { container } = render(<Header />)

    expect(container.querySelector('ion-header.main-header')).toBeTruthy()
    expect(container.querySelector('ion-toolbar')).toBeTruthy()
  })

  it('contains logo and title', () => {
    const { container } = render(<Header />)

    expect(container.querySelector('.logo-container')).toBeTruthy()
    expect(container.querySelector('ion-title .app-name')?.textContent).toBe('Moviee')
  })
})
