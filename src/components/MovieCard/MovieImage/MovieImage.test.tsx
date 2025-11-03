import { render } from '@testing-library/react'
import { vi } from 'vitest'
import MovieImage from './MovieImage'

vi.mock('@/utils/movie.utils', () => ({
  movieUtils: {
    getImageUrl: vi.fn(() => 'https://image.tmdb.org/t/p/w500/test.jpg'),
  },
}))

describe('MovieImage', () => {
  it('renders ion-img with correct alt', () => {
    const { container } = render(<MovieImage posterPath='/test.jpg' title='Test' />)

    const img = container.querySelector('ion-img')
    expect(img?.getAttribute('alt')).toBe('Poster do filme Test')
  })

  it('renders skeleton placeholder', () => {
    const { container } = render(<MovieImage posterPath='/test.jpg' title='Test' />)

    expect(container.querySelector('ion-skeleton-text')).toBeTruthy()
  })
})
