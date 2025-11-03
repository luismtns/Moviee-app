import { Preferences } from '@capacitor/preferences'
import type { StateStorage } from 'zustand/middleware'

export const createUnifiedStorage = (): StateStorage => {
  const isCapacitor = typeof window !== 'undefined' && 'Capacitor' in window

  if (isCapacitor) {
    return {
      getItem: async (name: string) => {
        const { value } = await Preferences.get({ key: name })
        return value
      },
      setItem: async (name: string, value: string) => {
        await Preferences.set({ key: name, value })
      },
      removeItem: async (name: string) => {
        await Preferences.remove({ key: name })
      }
    }
  }

  return {
    getItem: (name: string) => localStorage.getItem(name),
    setItem: (name: string, value: string) => localStorage.setItem(name, value),
    removeItem: (name: string) => localStorage.removeItem(name)
  }
}