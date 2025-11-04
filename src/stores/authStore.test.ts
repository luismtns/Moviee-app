import { beforeEach, describe, expect, it } from 'vitest'
import { useAuthStore } from './authStore'

const mockAccount = {
  id: 123,
  name: 'Test User',
  username: 'testuser',
  avatar: { gravatar: { hash: '' }, tmdb: { avatar_path: null } },
  iso_639_1: 'en',
  iso_3166_1: 'US',
  include_adult: false,
}

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.getState().clearSession()
  })

  it('initializes', () => {
    const state = useAuthStore.getState()
    expect(state.sessionId).toBeNull()
  })

  it('sets session', () => {
    useAuthStore.getState().setSession('session123', mockAccount)
    expect(useAuthStore.getState().isAuthenticated).toBe(true)
    expect(useAuthStore.getState().accountId).toBe(123)
  })

  it('clears session', () => {
    useAuthStore.getState().setSession('session123', mockAccount)
    useAuthStore.getState().clearSession()
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
  })
})
