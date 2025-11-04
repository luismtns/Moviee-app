import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AuthProvider } from './AuthProvider'

vi.mock('@/hooks/useGuestSession', () => ({
  useGuestSession: vi.fn(() => ({
    createSession: vi.fn(),
    isLoading: false,
  })),
}))

vi.mock('@/hooks/useAuthHydrated', () => ({
  useAuthHydrated: vi.fn(() => true),
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
