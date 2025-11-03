import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import MovieMeta from './MovieMeta'

describe('MovieMeta', () => {
  it('renders release year and rating', () => {
    const { container } = render(<MovieMeta releaseDate='2024-01-01' voteAverage={8.5} />)

    const chips = container.querySelectorAll('ion-chip')
    expect(chips.length).toBe(2)

    const yearChip = chips[0]?.querySelector('ion-label')
    const ratingChip = chips[1]?.querySelector('ion-label')

    expect(yearChip?.textContent).toBe('2024')
    expect(ratingChip?.textContent).toBe('8.5')
  })

  it('renders runtime when provided', () => {
    const { container } = render(<MovieMeta releaseDate='2024-01-01' voteAverage={8.5} runtime={120} />)

    const chips = container.querySelectorAll('ion-chip')
    expect(chips.length).toBe(3)

    const runtimeChip = chips[2]?.querySelector('ion-label')
    expect(runtimeChip?.textContent).toBe('120min')
  })

  it('does not render runtime when not provided', () => {
    const { container } = render(<MovieMeta releaseDate='2024-01-01' voteAverage={8.5} />)

    const chips = container.querySelectorAll('ion-chip')
    expect(chips.length).toBe(2)
  })
})
