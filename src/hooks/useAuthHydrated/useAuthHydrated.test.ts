import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useAuthHydrated } from './useAuthHydrated'

vi.mock('@/stores/authStore', () => ({
  useAuthStore: {
    persist: {
      onFinishHydration: vi.fn(() => vi.fn()),
      hasHydrated: vi.fn(() => true),
    },
  },
}))

describe('useAuthHydrated', () => {
  it('returns hydration state', () => {
    const { result } = renderHook(() => useAuthHydrated())
    expect(typeof result.current).toBe('boolean')
  })
})
