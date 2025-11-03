import { render } from '@testing-library/react'
import MovieInfo from './MovieInfo'

describe('MovieInfo', () => {
  it('renders title', () => {
    const { container } = render(<MovieInfo title='Inception' />)

    expect(container.querySelector('ion-card-title')?.textContent).toBe('Inception')
  })

  it('renders release year', () => {
    const { container } = render(<MovieInfo title='Test' releaseDate='2010-07-16' />)

    expect(container.querySelector('ion-card-subtitle')?.textContent).toBe('2010')
  })

  it('hides year when no date', () => {
    const { container } = render(<MovieInfo title='Test' />)

    expect(container.querySelector('ion-card-subtitle')).toBeFalsy()
  })

  it('highlights query match', () => {
    const { container } = render(<MovieInfo title='The Matrix' highlightQuery='matrix' />)

    const mark = container.querySelector('mark')
    expect(mark?.textContent).toBe('Matrix')
  })
})
