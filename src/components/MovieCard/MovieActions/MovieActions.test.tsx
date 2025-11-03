import { render } from '@testing-library/react'
import MovieActions from './MovieActions'

describe('MovieActions', () => {
  it('renders card header', () => {
    const { container } = render(
      <MovieActions>
        <div>Test</div>
      </MovieActions>
    )

    expect(container.querySelector('ion-card-header')).toBeTruthy()
  })

  it('renders children in columns', () => {
    const { container } = render(
      <MovieActions>
        <span>Action 1</span>
        <span>Action 2</span>
      </MovieActions>
    )

    const cols = container.querySelectorAll('ion-col')
    expect(cols).toHaveLength(2)
  })
})
