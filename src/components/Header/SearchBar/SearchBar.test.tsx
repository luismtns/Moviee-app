import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  it('renders with placeholder', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    )

    const searchbar = container.querySelector('ion-searchbar')
    expect(searchbar?.getAttribute('placeholder')).toBe('Buscar Filmes...')
  })

  it('syncs value with URL query', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/search?q=matrix']}>
        <SearchBar />
      </MemoryRouter>
    )

    const searchbar = container.querySelector('ion-searchbar')
    expect(searchbar?.getAttribute('value')).toBe('matrix')
  })
})
