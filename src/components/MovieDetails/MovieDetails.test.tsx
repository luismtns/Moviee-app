import { useMovieDetails } from '@/hooks/useMovies'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import MovieDetails from './MovieDetails'

vi.mock('@/hooks/useMovies')
vi.mock('@/components/Header/Header', () => ({ default: () => <div>Header</div> }))

const mockMovie = {
  id: 1,
  title: 'Test',
  overview: 'Overview',
  backdrop_path: '/backdrop.jpg',
  poster_path: '/poster.jpg',
  release_date: '2024-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  runtime: 120,
  budget: 5000000,
  revenue: 15000000,
  homepage: 'https://test.com',
  genres: [{ id: 1, name: 'Action' }],
  status: 'Released',
  tagline: 'Test tagline',
  popularity: 100,
  genre_ids: [1],
}

describe('MovieDetails', () => {
  it('renders content', () => {
    vi.mocked(useMovieDetails).mockReturnValue({
      data: mockMovie,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useMovieDetails>)
    const { container } = render(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>
    )
    expect(container.querySelector('ion-content')).toBeTruthy()
  })

  it('shows loading', () => {
    vi.mocked(useMovieDetails).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as ReturnType<typeof useMovieDetails>)
    const { container } = render(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>
    )
    expect(container.querySelector('ion-spinner')).toBeTruthy()
  })

  it('shows error', () => {
    vi.mocked(useMovieDetails).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error(),
    } as ReturnType<typeof useMovieDetails>)
    const { container } = render(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>
    )
    expect(container.textContent).toContain('não encontrado')
  })
})
