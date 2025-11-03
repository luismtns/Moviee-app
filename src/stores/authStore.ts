import { createUnifiedStorage } from '@/lib/storage.factory'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthStore {
  guestSessionId: string | null
  expiresAt: string | null
  isAuthenticated: boolean
  setSession: (guestSessionId: string, expiresAt: string) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      guestSessionId: null,
      expiresAt: null,
      isAuthenticated: false,

      setSession: (guestSessionId: string, expiresAt: string) => {
        set({
          guestSessionId,
          expiresAt,
          isAuthenticated: true,
        })
      },

      clearSession: () => {
        set({
          guestSessionId: null,
          expiresAt: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'moviee-auth',
      storage: createJSONStorage(() => createUnifiedStorage()),
    }
  )
)
