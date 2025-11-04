import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import VirtualizedMovieGrid from './VirtualizedMovieGrid'

const mockMovies = [
  {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test.jpg',
    backdrop_path: '/backdrop.jpg',
    vote_average: 8.5,
    vote_count: 100,
    release_date: '2024-01-01',
    overview: 'Test overview',
    genre_ids: [28, 12],
  },
]

describe('VirtualizedMovieGrid', () => {
  it('renders loading', () => {
    const { container } = render(<VirtualizedMovieGrid movies={[]} isLoading={true} />)
    expect(container.querySelector('ion-spinner')).toBeTruthy()
  })

  it('renders empty state', () => {
    const { container } = render(<VirtualizedMovieGrid movies={[]} isLoading={false} />)
    expect(container.querySelector('ion-text')).toBeTruthy()
  })

  it('renders grid', () => {
    const { container } = render(<VirtualizedMovieGrid movies={mockMovies} />)
    expect(container.querySelector('.virtuoso-grid')).toBeTruthy()
  })
})
