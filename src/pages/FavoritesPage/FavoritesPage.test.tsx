import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import FavoritesPage from './FavoritesPage'

vi.mock('@/hooks/useMovies', () => ({
  useFavoriteMovies: () => ({
    data: { pages: [] },
    fetchNextPage: vi.fn(),
    hasNextPage: false,
    isFetchingNextPage: false,
    isLoading: false,
  }),
}))

vi.mock('@/components/Header/Header', () => ({
  default: () => null,
}))

vi.mock('@/components/FavoritesSortFilter', () => ({
  default: () => null,
}))

vi.mock('@/components/VirtualizedMovieGrid/VirtualizedMovieGrid', () => ({
  default: () => null,
}))

describe('FavoritesPage', () => {
  it('renders', () => {
    const { container } = render(<FavoritesPage />)
    expect(container).toBeTruthy()
  })
})
