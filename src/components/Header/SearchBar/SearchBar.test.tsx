import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SearchBar } from './SearchBar'

const mockUpdateSearch = vi.fn()
const mockClearSearch = vi.fn()

vi.mock('@/hooks/useSearch', () => ({
  useSearch: () => ({
    searchQuery: '',
    updateSearch: mockUpdateSearch,
    clearSearch: mockClearSearch,
  }),
}))

describe('SearchBar', () => {
  it('renders', () => {
    const { container } = render(<SearchBar />)
    expect(container.querySelector('ion-searchbar')).toBeTruthy()
  })

  it('handles input', () => {
    const { container } = render(<SearchBar />)
    const searchbar = container.querySelector('ion-searchbar')
    const event = new CustomEvent('ionChange', { detail: { value: 'test' } })
    searchbar?.dispatchEvent(event)
    expect(mockUpdateSearch).toHaveBeenCalledWith('test')
  })

  it('handles clear', () => {
    const { container } = render(<SearchBar />)
    const searchbar = container.querySelector('ion-searchbar')
    const event = new CustomEvent('ionClear')
    searchbar?.dispatchEvent(event)
    expect(mockClearSearch).toHaveBeenCalled()
  })
})
