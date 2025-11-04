import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Header from './Header'

const mockUseAuth = vi.fn()

vi.mock('./SearchBar/SearchBar', () => ({ SearchBar: () => <div>SearchBar</div> }))
vi.mock('./Navigation/Navigation', () => ({ Navigation: () => <div>Navigation</div> }))
vi.mock('@/components/UserAvatar', () => ({ default: () => <div>UserAvatar</div> }))
vi.mock('@/hooks', () => ({ useAuth: () => mockUseAuth() }))

describe('Header', () => {
  it('renders header', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false })
    const { container } = render(<Header />)
    expect(container.querySelector('ion-header')).toBeTruthy()
  })

  it('renders back button when backHref provided', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false })
    const { container } = render(<Header backHref='/' />)
    expect(container.querySelector('ion-back-button')).toBeTruthy()
  })

  it('renders UserAvatar when authenticated', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true })
    const { container } = render(<Header />)
    expect(container.textContent).toContain('UserAvatar')
  })
})
