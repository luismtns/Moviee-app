import { render } from '@testing-library/react'
import MovieActions from './MovieActions'

describe('MovieActions', () => {
  it('renders ion-card-header structure', () => {
    const { container } = render(
      <MovieActions>
        <div>Test Action</div>
      </MovieActions>
    )

    expect(container.querySelector('ion-card-header.movie-actions')).toBeTruthy()
    expect(container.querySelector('ion-grid')).toBeTruthy()
    expect(container.querySelector('ion-row')).toBeTruthy()
  })

  it('renders children in ion-col', () => {
    const { container } = render(
      <MovieActions>
        <span>Action 1</span>
        <span>Action 2</span>
      </MovieActions>
    )

    const cols = container.querySelectorAll('ion-col')
    expect(cols).toHaveLength(2)
    expect(cols[0].textContent).toBe('Action 1')
    expect(cols[1].textContent).toBe('Action 2')
  })
})
