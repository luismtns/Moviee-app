import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import MovieHeader from './MovieHeader'

const mockGenres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
]

describe('MovieHeader', () => {
  it('renders title', () => {
    const { container } = render(<MovieHeader title='Test Movie' />)

    const title = container.querySelector('h1')
    expect(title?.textContent).toBe('Test Movie')
  })

  it('renders genres when provided', () => {
    const { container } = render(<MovieHeader title='Test Movie' genres={mockGenres} />)

    const chips = container.querySelectorAll('ion-chip')
    expect(chips.length).toBe(2)
    expect(chips[0]?.textContent).toBe('Action')
    expect(chips[1]?.textContent).toBe('Adventure')
  })

  it('does not render genres when empty', () => {
    const { container } = render(<MovieHeader title='Test Movie' genres={[]} />)

    const genresContainer = container.querySelector('.movie-genres')
    expect(genresContainer).toBeFalsy()
  })

  it('does not render genres when undefined', () => {
    const { container } = render(<MovieHeader title='Test Movie' />)

    const genresContainer = container.querySelector('.movie-genres')
    expect(genresContainer).toBeFalsy()
  })
})
