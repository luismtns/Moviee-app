import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useGuestSession } from './useGuestSession'

vi.mock('@/providers', () => ({
  useAuth: vi.fn(() => ({
    guestSessionId: 'test-session',
    isAuthenticated: true,
  })),
}))

describe('useGuestSession', () => {
  it('returns guest session state', () => {
    const { result } = renderHook(() => useGuestSession())

    expect(result.current.guestSessionId).toBe('test-session')
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.canRate).toBe(true)
  })
})
