import { render } from '@testing-library/react'
import { vi } from 'vitest'
import FavoritesSortFilter from './FavoritesSortFilter'

describe('FavoritesSortFilter', () => {
  const mockOnSortChange = vi.fn()

  it('renders title', () => {
    const { container } = render(<FavoritesSortFilter sortBy='created_at.desc' onSortChange={mockOnSortChange} />)

    const title = container.querySelector('.favorites-title')
    expect(title?.textContent).toBe('Meus Favoritos')
  })

  it('renders sort select', () => {
    const { container } = render(<FavoritesSortFilter sortBy='created_at.desc' onSortChange={mockOnSortChange} />)

    const select = container.querySelector('ion-select')
    expect(select).toBeTruthy()
    expect(select?.getAttribute('value')).toBe('created_at.desc')
  })

  it('renders two sort options', () => {
    const { container } = render(<FavoritesSortFilter sortBy='created_at.asc' onSortChange={mockOnSortChange} />)

    const options = container.querySelectorAll('ion-select-option')
    expect(options).toHaveLength(2)
  })

  it('displays correct current sort value', () => {
    const { container } = render(<FavoritesSortFilter sortBy='created_at.asc' onSortChange={mockOnSortChange} />)

    const select = container.querySelector('ion-select')
    expect(select?.getAttribute('value')).toBe('created_at.asc')
  })
})
