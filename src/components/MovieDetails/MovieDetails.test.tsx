import { useMovieDetails } from '@/hooks/useMovies'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import MovieDetails from './MovieDetails'

vi.mock('@/hooks/useMovies', () => ({
  useMovieDetails: vi.fn(),
}))

vi.mock('./FavoriteButton', () => ({
  default: () => <div data-testid='favorite-button'>Favorite Button</div>,
}))

vi.mock('./MovieBackdrop', () => ({
  default: () => <div data-testid='movie-backdrop'>Backdrop</div>,
}))

vi.mock('./MoviePoster', () => ({
  default: () => <div data-testid='movie-poster'>Poster</div>,
}))

vi.mock('./MovieHeader', () => ({
  default: () => <div data-testid='movie-header'>Header</div>,
}))

vi.mock('./MovieMeta', () => ({
  default: () => <div data-testid='movie-meta'>Meta</div>,
}))

vi.mock('./MovieSynopsis', () => ({
  default: () => <div data-testid='movie-synopsis'>Synopsis</div>,
}))

vi.mock('./MovieDetailsList', () => ({
  default: () => <div data-testid='movie-details-list'>Details List</div>,
}))

const mockUseMovieDetails = vi.mocked(useMovieDetails)

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test overview',
  backdrop_path: '/test-backdrop.jpg',
  poster_path: '/test-poster.jpg',
  release_date: '2024-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  runtime: 120,
  budget: 50000000,
  revenue: 150000000,
  genres: [{ id: 1, name: 'Action' }],
}

describe('MovieDetails', () => {
  it('renders all components when movie loads', () => {
    mockUseMovieDetails.mockReturnValue({
      data: mockMovie,
      isLoading: false,
      error: null,
    } as any)

    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <MovieDetails />
      </MemoryRouter>
    )

    expect(getByTestId('movie-backdrop')).toBeTruthy()
    expect(getByTestId('movie-poster')).toBeTruthy()
    expect(getByTestId('movie-header')).toBeTruthy()
    expect(getByTestId('movie-meta')).toBeTruthy()
    expect(getByTestId('favorite-button')).toBeTruthy()
    expect(getByTestId('movie-synopsis')).toBeTruthy()
    expect(getByTestId('movie-details-list')).toBeTruthy()
  })

  it('shows loading spinner', () => {
    mockUseMovieDetails.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    } as any)

    const { container } = render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <MovieDetails />
      </MemoryRouter>
    )

    const spinner = container.querySelector('ion-spinner')
    expect(spinner).toBeTruthy()
  })

  it('shows error message', () => {
    mockUseMovieDetails.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Test error'),
    } as any)

    const { container } = render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <MovieDetails />
      </MemoryRouter>
    )

    expect(container.textContent).toContain('Filme não encontrado')
  })

  it('renders movie title in toolbar', () => {
    mockUseMovieDetails.mockReturnValue({
      data: mockMovie,
      isLoading: false,
      error: null,
    } as any)

    const { container } = render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <MovieDetails />
      </MemoryRouter>
    )

    const title = container.querySelector('ion-title')
    expect(title?.textContent).toBe('Test Movie')
  })
})
