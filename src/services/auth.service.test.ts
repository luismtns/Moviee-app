import api from '@/lib/tmdb.axios'
import { describe, expect, it, vi } from 'vitest'
import { authService } from './auth.service'

vi.mock('@/lib/tmdb.axios')

const mockAccount = {
  id: 123,
  name: 'Test User',
  username: 'testuser',
  avatar: { gravatar: { hash: '' }, tmdb: { avatar_path: null } },
  iso_639_1: 'en',
  iso_3166_1: 'US',
  include_adult: false,
}

describe('authService', () => {
  it('createRequestToken', async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: { request_token: 'abc123', success: true, expires_at: '2025-12-31' },
    })
    const result = await authService.createRequestToken()
    expect(result.request_token).toBe('abc123')
  })

  it('createSession', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { session_id: 'session123', success: true } })
    const result = await authService.createSession('token')
    expect(result.session_id).toBe('session123')
  })

  it('getAccountDetails', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: mockAccount })
    const result = await authService.getAccountDetails('session123')
    expect(result.id).toBe(123)
  })
})
