import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SearchBar } from './SearchBar'

vi.mock('@/hooks/useSearch', () => ({
  useSearch: () => ({
    searchQuery: '',
    updateSearch: vi.fn(),
    clearSearch: vi.fn(),
    navigateToSearch: vi.fn(),
    canGoBack: false,
  }),
}))

describe('SearchBar', () => {
  it('renders searchbar', () => {
    const { container } = render(<SearchBar />)
    expect(container.querySelector('ion-searchbar')).toBeTruthy()
  })

  it('renders toolbar', () => {
    const { container } = render(<SearchBar />)
    expect(container.querySelector('ion-toolbar')).toBeTruthy()
  })
})
