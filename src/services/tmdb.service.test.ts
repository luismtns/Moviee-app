import api from '@/lib/tmdb.axios'
import { describe, expect, it, vi } from 'vitest'
import { tmdbService } from './tmdb.service'

vi.mock('@/lib/tmdb.axios')

describe('tmdbService', () => {
  it('getPopular', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: { results: [] } })
    const result = await tmdbService.getPopular(1)
    expect(result.results).toBeDefined()
  })

  it('search', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: { results: [] } })
    const result = await tmdbService.search('test', 1)
    expect(result.results).toBeDefined()
  })

  it('getDetails', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: { id: 1 } })
    const result = await tmdbService.getDetails(1)
    expect(result.id).toBe(1)
  })
})
