import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AuthProvider } from './AuthProvider'

vi.mock('@/services/auth.service', () => ({
  authService: {
    getAccountDetails: vi.fn(),
    createSession: vi.fn(),
    isSessionValid: vi.fn(() => true),
  },
}))

vi.mock('@/hooks/useAuthHydrated', () => ({
  useAuthHydrated: vi.fn(() => true),
}))

vi.mock('@/stores/authStore', () => ({
  useAuthStore: vi.fn(() => ({
    sessionId: null,
    requestToken: null,
    isAuthenticated: false,
    setSession: vi.fn(),
    clearSession: vi.fn(),
  })),
}))

describe('AuthProvider', () => {
  it('renders children', () => {
    const { container } = render(
      <AuthProvider>
        <div data-testid='child'>Test</div>
      </AuthProvider>
    )
    expect(container.textContent).toContain('Test')
  })
})
