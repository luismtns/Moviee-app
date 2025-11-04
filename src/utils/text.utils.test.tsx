import { describe, expect, it } from 'vitest'
import { highlightText } from './text.utils'

describe('text.utils', () => {
  it('highlights query', () => {
    const result = highlightText('Test Movie', 'test')
    expect(result).toBeDefined()
  })

  it('returns text when no query', () => {
    const result = highlightText('Test Movie', '')
    expect(result).toBe('Test Movie')
  })
})
