import { Browser } from '@capacitor/browser'
import { Capacitor } from '@capacitor/core'
import { describe, expect, it, vi } from 'vitest'
import {
  getCurrentOrigin,
  getCurrentPathname,
  getCurrentRedirectUrl,
  getUrlParams,
  openExternalUrl,
  redirectToExternalUrl,
  replaceHistoryState,
} from './navigation.utils'

vi.mock('@capacitor/browser', () => ({
  Browser: {
    open: vi.fn(),
  },
}))

vi.mock('@capacitor/core', () => ({
  Capacitor: {
    isNativePlatform: vi.fn(),
  },
}))

describe('navigation.utils', () => {
  it('opens external URL on web platform', async () => {
    vi.mocked(Capacitor.isNativePlatform).mockReturnValue(false)
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

    await openExternalUrl('https://example.com')

    expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener,noreferrer')
  })

  it('opens external URL on native platform', async () => {
    vi.mocked(Capacitor.isNativePlatform).mockReturnValue(true)
    vi.mocked(Browser.open).mockResolvedValue()

    await openExternalUrl('https://example.com')

    expect(Browser.open).toHaveBeenCalledWith({ url: 'https://example.com', windowName: '_system' })
  })

  it('calls redirectToExternalUrl', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    redirectToExternalUrl('')
    expect(spy).toHaveBeenCalledWith('Attempted to redirect to empty URL')
  })

  it('gets current origin', () => {
    expect(getCurrentOrigin()).toBe(window.location.origin)
  })

  it('gets current pathname', () => {
    expect(getCurrentPathname()).toBe(window.location.pathname)
  })

  it('gets current redirect URL', () => {
    expect(getCurrentRedirectUrl()).toContain(window.location.origin)
  })

  it('gets URL params', () => {
    const params = getUrlParams()
    expect(params).toBeInstanceOf(URLSearchParams)
  })

  it('replaces history state', () => {
    const spy = vi.spyOn(window.history, 'replaceState')
    replaceHistoryState('/test')
    expect(spy).toHaveBeenCalledWith({}, document.title, '/test')
  })
})
