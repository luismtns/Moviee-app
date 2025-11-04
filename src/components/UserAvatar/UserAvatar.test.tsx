import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import UserAvatar from './UserAvatar'

const mockUseAuth = vi.fn()

vi.mock('@/hooks', () => ({
  useAuth: () => mockUseAuth(),
}))

describe('UserAvatar', () => {
  it('renders with user initials', () => {
    mockUseAuth.mockReturnValue({
      account: { username: 'johndoe', name: 'John Doe' },
      logout: vi.fn(),
    })
    const { container } = render(<UserAvatar />)
    expect(container.querySelector('.user-avatar')).toBeTruthy()
    expect(container.textContent).toContain('J')
  })

  it('returns null without account', () => {
    mockUseAuth.mockReturnValue({
      account: null,
      logout: vi.fn(),
    })
    const { container } = render(<UserAvatar />)
    expect(container.querySelector('.user-avatar')).toBeFalsy()
  })
})
