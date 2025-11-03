import { render } from '@testing-library/react'
import MovieRating from './MovieRating'

describe('MovieRating', () => {
  it('renders rating value', () => {
    const { container } = render(<MovieRating rating={8.5} />)

    expect(container.querySelector('ion-badge')?.textContent).toContain('8.5')
  })

  it('uses warning color', () => {
    const { container } = render(<MovieRating rating={8.5} />)

    expect(container.querySelector('ion-badge')?.getAttribute('color')).toBe('warning')
  })
})
