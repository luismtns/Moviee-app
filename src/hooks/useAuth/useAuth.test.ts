import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useAuth } from './useAuth'

const mockAccount = {
  id: 123,
  name: 'Test User',
  username: 'testuser',
  avatar: { gravatar: { hash: '' }, tmdb: { avatar_path: null } },
  iso_639_1: 'en',
  iso_3166_1: 'US',
  include_adult: false,
}

const mockClearSession = vi.fn()
const mockClear = vi.fn()

vi.mock('@/stores/authStore', () => ({
  useAuthStore: vi.fn(() => ({
    sessionId: 'test-session',
    accountId: 123,
    account: mockAccount,
    isAuthenticated: true,
    setRequestToken: vi.fn(),
    clearSession: mockClearSession,
  })),
}))

vi.mock('@/services/auth.service', () => ({
  authService: {
    createRequestToken: vi.fn(),
    getAuthenticationUrl: vi.fn(),
    deleteSession: vi.fn(),
  },
}))

vi.mock('@/stores/favoritesStore', () => ({
  useFavoritesStore: {
    getState: () => ({ clear: mockClear }),
  },
}))

describe('useAuth', () => {
  it('returns auth data', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.sessionId).toBe('test-session')
    expect(result.current.accountId).toBe(123)
    expect(result.current.isAuthenticated).toBe(true)
  })
})
