import api from '@/lib/tmdb.axios'
import { describe, expect, it, vi } from 'vitest'
import { authService } from './auth.service'

vi.mock('@/lib/tmdb.axios')

describe('authService', () => {
  it('createGuestSession', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { guest_session_id: '123' } })
    const result = await authService.createGuestSession()
    expect(result.guest_session_id).toBe('123')
  })
})
