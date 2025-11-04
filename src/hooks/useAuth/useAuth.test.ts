import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useAuth } from './useAuth'

vi.mock('@/stores/authStore', () => ({
  useAuthStore: vi.fn(() => ({
    guestSessionId: 'test-session',
    isAuthenticated: true,
  })),
}))

describe('useAuth', () => {
  it('returns auth data', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.guestSessionId).toBe('test-session')
    expect(result.current.isAuthenticated).toBe(true)
  })
})
