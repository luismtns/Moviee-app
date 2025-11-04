import { MovieDetails } from '@/types/Movie'
import { render } from '@testing-library/react'
import { calendar, cash, star } from 'ionicons/icons'
import { describe, expect, it } from 'vitest'
import MovieDetailsList from './MovieDetailsList'

describe('MovieDetailsList', () => {
  const mockMovie: MovieDetails = {
    id: 1,
    title: 'Test Movie',
    overview: 'Test overview',
    poster_path: '/poster.jpg',
    backdrop_path: '/backdrop.jpg',
    release_date: '2024-01-01',
    vote_average: 8.5,
    vote_count: 1000,
    genre_ids: [1],
    runtime: 120,
    genres: [{ id: 1, name: 'Action' }],
    status: 'Released',
    tagline: 'Test tagline',
    popularity: 100,
    homepage: 'https://test.com',
    budget: 50000000,
    revenue: 100000000,
  }

  it('renders fields', () => {
    const { container } = render(
      <MovieDetailsList
        data={mockMovie}
        fields={[
          { key: 'release_date', icon: calendar, label: 'Release' },
          { key: 'vote_average', icon: star, label: 'Rating' },
        ]}
      />
    )
    expect(container.querySelectorAll('ion-item').length).toBe(2)
  })

  it('uses custom render', () => {
    const { container } = render(
      <MovieDetailsList
        data={mockMovie}
        fields={[{ key: 'budget', icon: cash, label: 'Budget', render: (d) => `$${d.budget}` }]}
      />
    )
    expect(container.querySelector('ion-label p')?.innerHTML).toContain('$50000000')
  })
})
