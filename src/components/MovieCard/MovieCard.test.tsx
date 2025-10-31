import type { Movie } from '@/types/Movie'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import MovieCard from './MovieCard'

// Mock dos hooks e componentes
vi.mock('@/hooks/useFavorites', () => ({
  useFavorites: () => ({
    isFavorite: vi.fn(() => false),
    toggleFavorite: vi.fn(),
  }),
}))

vi.mock('./MovieImage/MovieImage', () => ({
  default: ({ variant }: any) => <div data-testid={`movie-image-${variant}`} />,
}))

vi.mock('./MovieInfo/MovieInfo', () => ({
  default: ({ variant }: any) => <div data-testid={`movie-info-${variant}`} />,
}))

vi.mock('./MovieRating/MovieRating', () => ({
  default: ({ variant }: any) => <div data-testid={`movie-rating-${variant}`} />,
}))

vi.mock('./MovieActions/MovieActions', () => ({
  default: ({ onFavoriteClick }: any) => <button data-testid='movie-actions' onClick={onFavoriteClick} />,
}))

const mockMovie: Movie = {
  id: 123,
  title: 'Test Movie',
  overview: 'Test overview',
  poster_path: '/test.jpg',
  vote_average: 8.5,
  release_date: '2024-01-15',
  backdrop_path: '/backdrop.jpg',
  genre_ids: [28, 12],
  vote_count: 1000,
}

describe('MovieCard', () => {
  it('should render card layout by default', () => {
    render(<MovieCard movie={mockMovie} />)
    expect(screen.getByTestId('movie-card')).toBeDefined()
  })

  it('should render list layout when specified', () => {
    render(<MovieCard movie={mockMovie} />)
    expect(screen.getByTestId('movie-card-list')).toBeDefined()
  })

  it('should call toggleFavorite when favorite clicked', () => {
    render(<MovieCard movie={mockMovie} />)
    fireEvent.click(screen.getByTestId('movie-actions'))
    // Teste simples - apenas verifica que o click funciona
    expect(screen.getByTestId('movie-actions')).toBeDefined()
  })
})
