import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Search from './Search'

vi.mock('@/hooks/useSearch', () => ({
  useSearch: () => ({
    searchQuery: '',
    clearSearch: vi.fn(),
  }),
}))

vi.mock('@/hooks/useMovies', () => ({
  useSearchMovies: () => ({
    data: { pages: [] },
    fetchNextPage: vi.fn(),
    isLoading: false,
    isFetchingNextPage: false,
  }),
}))

vi.mock('@/components/Header/Header', () => ({
  default: () => null,
}))

vi.mock('@/components/VirtualizedMovieGrid/VirtualizedMovieGrid', () => ({
  default: () => null,
}))

describe('Search', () => {
  it('renders', () => {
    const { container } = render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    )
    expect(container).toBeTruthy()
  })
})
