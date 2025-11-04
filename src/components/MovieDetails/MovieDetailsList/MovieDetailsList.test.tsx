import { render } from '@testing-library/react'
import { calendar, star } from 'ionicons/icons'
import { describe, expect, it } from 'vitest'
import MovieDetailsList from './MovieDetailsList'

describe('MovieDetailsList', () => {
  const data = { releaseDate: '2024-01-01', vote: { average: 8.5 }, budget: 50000000 }

  it('renders fields', () => {
    const { container } = render(
      <MovieDetailsList
        data={data}
        fields={[
          { key: 'releaseDate', icon: calendar, label: 'Release' },
          { key: 'vote.average', icon: star, label: 'Rating' },
        ]}
      />
    )
    expect(container.querySelectorAll('ion-item').length).toBe(2)
  })

  it('uses custom render', () => {
    const { container } = render(
      <MovieDetailsList
        data={data}
        fields={[{ key: 'budget', icon: calendar, label: 'Budget', render: (d) => `$${d.budget}` }]}
      />
    )
    expect(container.querySelector('ion-label p')?.innerHTML).toContain('$50000000')
  })

  it('handles nested keys', () => {
    const { container } = render(
      <MovieDetailsList data={data} fields={[{ key: 'vote.average', icon: star, label: 'Rating' }]} />
    )
    expect(container.querySelector('ion-label p')?.textContent).toBe('8.5')
  })
})
