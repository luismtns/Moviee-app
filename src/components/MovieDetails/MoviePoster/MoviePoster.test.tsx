import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import MoviePoster from './MoviePoster'

describe('MoviePoster', () => {
  it('renders ion-img with correct props', () => {
    const { container } = render(<MoviePoster posterPath='/test-poster.jpg' title='Test Movie' />)

    const img = container.querySelector('ion-img')
    expect(img).toBeTruthy()
    expect(img?.getAttribute('alt')).toBe('Test Movie')
    expect(img?.classList.contains('movie-poster')).toBe(true)
  })

  it('handles null poster path', () => {
    const { container } = render(<MoviePoster posterPath={null} title='Test Movie' />)

    const img = container.querySelector('ion-img')
    expect(img).toBeTruthy()
    expect(img?.getAttribute('alt')).toBe('Test Movie')
  })
})
