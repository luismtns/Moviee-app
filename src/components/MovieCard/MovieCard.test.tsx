import type { Movie } from '@/types/Movie'
import { render } from '@testing-library/react'
import { vi } from 'vitest'
import MovieCard from './MovieCard'

vi.mock('@/hooks/useFavorites', () => ({
  useFavorites: () => ({
    isFavorite: vi.fn(() => false),
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
  }),
}))

const mockMovie: Movie = {
  id: 1,
  title: 'Test',
  overview: '',
  poster_path: '/test.jpg',
  backdrop_path: null,
  release_date: '2024-01-01',
  vote_average: 8.5,
  vote_count: 100,
  genre_ids: [1],
}

describe('MovieCard', () => {
  it('renders as ion-card', () => {
    const { container } = render(<MovieCard movie={mockMovie} />)

    expect(container.querySelector('ion-card.movie-card')).toBeTruthy()
  })

  it('contains all subcomponents', () => {
    const { container } = render(<MovieCard movie={mockMovie} />)

    expect(container.querySelector('.movie-image-wrapper')).toBeTruthy()
    expect(container.querySelector('ion-card-content')).toBeTruthy()
    expect(container.querySelector('ion-card-header')).toBeTruthy()
  })
})
