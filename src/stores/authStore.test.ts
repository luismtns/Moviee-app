import { describe, expect, it } from 'vitest'
import { useAuthStore } from './authStore'

describe('authStore', () => {
  it('initializes', () => {
    const state = useAuthStore.getState()
    expect(state.guestSessionId).toBeNull()
  })

  it('sets session', () => {
    useAuthStore.getState().setSession('test-123', '2025-12-31')
    expect(useAuthStore.getState().isAuthenticated).toBe(true)
  })

  it('clears session', () => {
    useAuthStore.getState().clearSession()
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
  })
})
