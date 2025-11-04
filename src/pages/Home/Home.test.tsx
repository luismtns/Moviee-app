import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Home from './Home'

vi.mock('@/hooks/useMovies', () => ({
  usePopularMovies: () => ({
    data: { pages: [{ results: [] }] },
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

describe('Home', () => {
  it('renders', () => {
    const { container } = render(<Home />)
    expect(container).toBeTruthy()
  })
})
