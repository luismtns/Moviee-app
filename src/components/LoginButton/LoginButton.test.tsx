import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import LoginButton from './LoginButton'

const mockUseAuth = vi.fn()

vi.mock('@/hooks', () => ({
  useAuth: () => mockUseAuth(),
}))

vi.mock('@/utils/navigation.utils', () => ({
  redirectToExternalUrl: vi.fn(),
}))

describe('LoginButton', () => {
  it('renders login when not authenticated', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      startAuthentication: vi.fn(),
      logout: vi.fn(),
    })
    const { container } = render(<LoginButton />)
    expect(container.querySelector('ion-button')).toBeTruthy()
    expect(container.textContent).toContain('Login')
  })

  it('renders nothing when authenticated', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      startAuthentication: vi.fn(),
      logout: vi.fn(),
    })
    const { container } = render(<LoginButton />)
    expect(container.querySelector('ion-button')).toBeFalsy()
  })

  it('renders logout when showLogout', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      startAuthentication: vi.fn(),
      logout: vi.fn(),
    })
    const { container } = render(<LoginButton showLogout />)
    expect(container.textContent).toContain('Logout')
  })
})
