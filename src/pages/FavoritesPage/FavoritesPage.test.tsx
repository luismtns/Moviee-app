import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import FavoritesPage from './FavoritesPage'

const mockUseAuth = vi.fn()

vi.mock('@/hooks', () => ({
  useAuth: () => mockUseAuth(),
}))

vi.mock('@/hooks/useMovies', () => ({
  useFavoriteMovies: () => ({
    data: { pages: [] },
    fetchNextPage: vi.fn(),
    hasNextPage: false,
    isFetchingNextPage: false,
    isLoading: false,
  }),
}))

vi.mock('@/hooks/useFavorites', () => ({
  useFavorites: () => ({
    isFavorite: vi.fn(() => false),
    toggleFavorite: vi.fn(),
    canUseFavorites: true,
  }),
}))

vi.mock('@/components/Header/Header', () => ({
  default: () => null,
}))

vi.mock('@/components/LoginButton', () => ({
  default: () => <div>LoginButton</div>,
}))

vi.mock('@/components/FavoritesSortFilter', () => ({
  default: () => null,
  SortBy: {},
}))

vi.mock('@/components/VirtualizedMovieGrid/VirtualizedMovieGrid', () => ({
  default: () => null,
}))

describe('FavoritesPage', () => {
  it('renders login prompt when not authenticated', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false })
    const { container } = render(<FavoritesPage />)
    expect(container.textContent).toContain('LoginButton')
  })

  it('renders movies when authenticated', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true })
    const { container } = render(<FavoritesPage />)
    expect(container.querySelector('ion-content')).toBeTruthy()
  })
})
