import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import MovieDetailsPage from './MovieDetailsPage'

vi.mock('@/components/MovieDetails', () => ({
  default: () => <div data-testid='movie-details-component'>Movie Details Component</div>,
}))

describe('MovieDetailsPage', () => {
  it('renders MovieDetails component', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <MovieDetailsPage />
      </MemoryRouter>
    )

    expect(getByTestId('movie-details-component')).toBeTruthy()
  })

  it('renders within IonPage', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <MovieDetailsPage />
      </MemoryRouter>
    )

    const movieDetails = container.querySelector('[data-testid="movie-details-component"]')
    expect(movieDetails).toBeTruthy()
  })
})
