import { render } from '@testing-library/react'
import MovieRating from './MovieRating'

describe('MovieRating', () => {
  it('renders rating in ion-badge', () => {
    const { container } = render(<MovieRating rating={8.5} />)

    const badge = container.querySelector('ion-badge')
    expect(badge?.textContent?.trim()).toContain('8.5')
  })

  it('uses warning color', () => {
    const { container } = render(<MovieRating rating={8.5} />)

    const badge = container.querySelector('ion-badge')
    expect(badge?.getAttribute('color')).toBe('warning')
  })
})
