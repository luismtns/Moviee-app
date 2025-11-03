import { render } from '@testing-library/react'
import { vi } from 'vitest'
import MovieImage from './MovieImage'

vi.mock('@/utils/movie.utils', () => ({
  movieUtils: {
    getImageUrl: vi.fn(() => 'https://image.tmdb.org/t/p/w500/test.jpg'),
  },
}))

describe('MovieImage', () => {
  it('renders image with alt text', () => {
    const { container } = render(<MovieImage posterPath='/test.jpg' title='Test' />)

    expect(container.querySelector('ion-img')?.getAttribute('alt')).toBe('Poster do filme Test')
  })

  it('renders loading skeleton', () => {
    const { container } = render(<MovieImage posterPath='/test.jpg' title='Test' />)

    expect(container.querySelector('ion-skeleton-text')).toBeTruthy()
  })
})
