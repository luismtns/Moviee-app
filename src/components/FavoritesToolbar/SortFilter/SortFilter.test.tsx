import { render } from '@testing-library/react'
import { vi } from 'vitest'
import SortFilter from './SortFilter'

describe('SortFilter', () => {
  it('renders', () => {
    const { container } = render(<SortFilter sortBy='created_at.desc' onSortChange={vi.fn()} />)
    expect(container.querySelector('ion-select')).toBeTruthy()
  })

  it('shows options', () => {
    const { container } = render(<SortFilter sortBy='created_at.asc' onSortChange={vi.fn()} />)
    expect(container.querySelectorAll('ion-select-option')).toHaveLength(2)
  })
})
