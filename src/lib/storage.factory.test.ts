import { describe, expect, it } from 'vitest'
import { createUnifiedStorage } from './storage.factory'

describe('createUnifiedStorage', () => {
  it('creates storage instance', () => {
    const storage = createUnifiedStorage()
    expect(storage).toBeDefined()
    expect(storage.getItem).toBeDefined()
  })

  it('gets and sets items', async () => {
    const storage = createUnifiedStorage()
    await storage.setItem('key', 'value')
    const value = await storage.getItem('key')
    expect(value).toBe('value')
  })

  it('removes items', async () => {
    const storage = createUnifiedStorage()
    await storage.setItem('key', 'value')
    await storage.removeItem('key')
    const value = await storage.getItem('key')
    expect(value).toBeNull()
  })
})
