import { render } from '@testing-library/react'
import MovieInfo from './MovieInfo'

describe('MovieInfo', () => {
  it('renders title', () => {
    const { container } = render(<MovieInfo title='Test' />)
    expect(container.querySelector('ion-card-title')).toBeTruthy()
  })

  it('renders year', () => {
    const { container } = render(<MovieInfo title='Test' releaseDate='2010-06-01' />)
    expect(container.querySelector('ion-card-subtitle')).toBeTruthy()
  })
})
