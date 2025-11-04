import { render } from '@testing-library/react'
import { vi } from 'vitest'
import FavoritesSortFilter from './FavoritesSortFilter'

describe('FavoritesSortFilter', () => {
  it('renders title and select', () => {
    const { container } = render(<FavoritesSortFilter sortBy='created_at.desc' onSortChange={vi.fn()} />)
    expect(container.textContent).toContain('Meus Favoritos')
    expect(container.querySelector('ion-select')).toBeTruthy()
  })

  it('shows sort options', () => {
    const { container } = render(<FavoritesSortFilter sortBy='created_at.asc' onSortChange={vi.fn()} />)
    expect(container.querySelectorAll('ion-select-option')).toHaveLength(2)
  })
})
