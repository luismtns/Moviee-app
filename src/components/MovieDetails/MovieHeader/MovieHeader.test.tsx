import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import MovieHeader from './MovieHeader'

const mockGenres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
]

describe('MovieHeader', () => {
  it('renders title', () => {
    const { container } = render(<MovieHeader title='Test' />)
    expect(container.querySelector('h1')?.textContent).toBe('Test')
  })

  it('renders genres', () => {
    const { container } = render(<MovieHeader title='Test' genres={mockGenres} />)
    expect(container.querySelectorAll('ion-chip')).toHaveLength(2)
  })
})
