import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useGuestSession } from './useGuestSession'

vi.mock('@/stores/authStore', () => ({
  useAuthStore: vi.fn(() => ({
    sessionId: 'test-session',
    isAuthenticated: true,
  })),
}))

describe('useGuestSession', () => {
  it('returns session state', () => {
    const { result } = renderHook(() => useGuestSession())

    expect(result.current.sessionId).toBe('test-session')
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.canFavorite).toBe(true)
  })
})
