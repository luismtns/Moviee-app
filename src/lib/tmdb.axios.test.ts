import { describe, expect, it } from 'vitest'
import api from './tmdb.axios'

describe('tmdb.axios', () => {
  it('has baseURL configured', () => {
    expect(api.defaults.baseURL).toBeDefined()
  })

  it('has timeout configured', () => {
    expect(api.defaults.timeout).toBe(10000)
  })
})
