import { render } from '@testing-library/react'
import MovieInfo from './MovieInfo'

describe('MovieInfo', () => {
  it('renders title in ion-card-title', () => {
    const { container } = render(<MovieInfo title='Inception' />)

    const title = container.querySelector('ion-card-title')
    expect(title?.textContent).toBe('Inception')
  })

  it('renders year from release date', () => {
    const { container } = render(<MovieInfo title='Test' releaseDate='2010-07-16' />)

    const subtitle = container.querySelector('ion-card-subtitle')
    expect(subtitle?.textContent).toBe('2010')
  })

  it('hides subtitle when no date', () => {
    const { container } = render(<MovieInfo title='Test' />)

    expect(container.querySelector('ion-card-subtitle')).toBeFalsy()
  })
})
