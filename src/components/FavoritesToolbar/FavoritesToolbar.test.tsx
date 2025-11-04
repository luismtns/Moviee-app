import { render } from '@testing-library/react'
import { vi } from 'vitest'
import FavoritesToolbar from './FavoritesToolbar'

vi.mock('../SortFilter', () => ({
  default: () => null,
}))

describe('FavoritesToolbar', () => {
  it('renders', () => {
    const { container } = render(<FavoritesToolbar sortBy='created_at.desc' onSortChange={vi.fn()} />)
    expect(container.querySelector('ion-toolbar')).toBeTruthy()
    expect(container.textContent).toContain('Meus Favoritos')
  })
})
