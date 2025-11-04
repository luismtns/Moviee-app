import { createUnifiedStorage } from '@/lib/storage.factory'
import type { Account } from '@/types/Auth'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthStore {
  sessionId: string | null
  accountId: number | null
  requestToken: string | null
  account: Account | null
  isAuthenticated: boolean
  setRequestToken: (token: string) => void
  setSession: (sessionId: string, account: Account) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      sessionId: null,
      accountId: null,
      requestToken: null,
      account: null,
      isAuthenticated: false,

      setRequestToken: (token: string) => {
        set({ requestToken: token })
      },

      setSession: (sessionId: string, account: Account) => {
        set({
          sessionId,
          accountId: account.id,
          account,
          requestToken: null,
          isAuthenticated: true,
        })
      },

      clearSession: () => {
        set({
          sessionId: null,
          accountId: null,
          requestToken: null,
          account: null,
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
