import { Browser } from '@capacitor/browser'
import { Capacitor } from '@capacitor/core'

/**
 * Opens an external URL in the system browser (mobile) or new tab (web)
 * Uses Capacitor Browser API on native platforms for better UX
 */
export const openExternalUrl = async (url: string): Promise<void> => {
  if (!url) {
    console.warn('Attempted to open empty URL')
    return
  }

  try {
    if (Capacitor.isNativePlatform()) {
      await Browser.open({ url, windowName: '_system' })
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  } catch (error) {
    console.error('Failed to open external URL:', error)
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

/**
 * Navigates to an external URL by replacing the current location
 * Used for authentication flows where redirect is needed
 */
export const redirectToExternalUrl = (url: string): void => {
  if (!url) {
    console.warn('Attempted to redirect to empty URL')
    return
  }

  window.location.href = url
}

/**
 * Gets the current location origin
 */
export const getCurrentOrigin = (): string => {
  return window.location.origin
}

/**
 * Gets the current location pathname
 */
export const getCurrentPathname = (): string => {
  return window.location.pathname
}

/**
 * Gets the current redirect URL (origin + pathname)
 */
export const getCurrentRedirectUrl = (): string => {
  return `${getCurrentOrigin()}${getCurrentPathname()}`
}

/**
 * Gets URL parameters from current location
 */
export const getUrlParams = (): URLSearchParams => {
  return new URLSearchParams(window.location.search)
}

/**
 * Replaces the current browser history state
 * Used to clean up URL parameters after processing
 */
export const replaceHistoryState = (path: string): void => {
  window.history.replaceState({}, document.title, path)
}
