import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import MovieDetailsList from './MovieDetailsList'

describe('MovieDetailsList', () => {
  const defaultProps = {
    releaseDate: '2024-01-01',
    voteAverage: 8.5,
    voteCount: 1000,
    budget: 50000000,
    revenue: 150000000,
  }

  it('renders all list items', () => {
    const { container } = render(<MovieDetailsList {...defaultProps} />)

    const items = container.querySelectorAll('ion-item')
    expect(items.length).toBe(4)
  })

  it('renders release date', () => {
    const { container } = render(<MovieDetailsList {...defaultProps} />)

    const items = container.querySelectorAll('ion-item')
    const releaseDateItem = items[0]?.querySelector('ion-label h2')
    expect(releaseDateItem?.textContent).toBe('Data de Lançamento')
  })

  it('renders rating with vote count', () => {
    const { container } = render(<MovieDetailsList {...defaultProps} />)

    const items = container.querySelectorAll('ion-item')
    const ratingItem = items[1]?.querySelector('ion-label h2')
    expect(ratingItem?.textContent).toBe('Nota do TMDB')
  })

  it('renders budget and revenue', () => {
    const { container } = render(<MovieDetailsList {...defaultProps} />)

    const items = container.querySelectorAll('ion-item')
    const budgetItem = items[2]?.querySelector('ion-label h2')
    const revenueItem = items[3]?.querySelector('ion-label h2')

    expect(budgetItem?.textContent).toBe('Orçamento')
    expect(revenueItem?.textContent).toBe('Receita')
  })

  it('shows N/A for zero budget and revenue', () => {
    const { container } = render(<MovieDetailsList {...defaultProps} budget={0} revenue={0} />)

    const items = container.querySelectorAll('ion-item')
    const budgetText = items[2]?.querySelector('ion-label p strong')
    const revenueText = items[3]?.querySelector('ion-label p strong')

    expect(budgetText?.textContent).toBe('N/A')
    expect(revenueText?.textContent).toBe('N/A')
  })
})
