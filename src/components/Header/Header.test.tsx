import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Header from './Header'

vi.mock('./SearchBar/SearchBar', () => ({ SearchBar: () => <div>SearchBar</div> }))
vi.mock('./Navigation/Navigation', () => ({ Navigation: () => <div>Navigation</div> }))

describe('Header', () => {
  it('renders header', () => {
    const { container } = render(<Header />)
    expect(container.querySelector('ion-header')).toBeTruthy()
  })

  it('renders back button when backHref provided', () => {
    const { container } = render(<Header backHref='/' />)
    expect(container.querySelector('ion-back-button')).toBeTruthy()
  })

  it('does not render back button without backHref', () => {
    const { container } = render(<Header />)
    expect(container.querySelector('ion-back-button')).toBeFalsy()
  })
})
