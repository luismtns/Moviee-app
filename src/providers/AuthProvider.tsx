import { useAuthHydrated } from '@/hooks'
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/authStore'
import React, { createContext, useContext, useEffect, type ReactNode } from 'react'

interface AuthContextValue {
  guestSessionId: string | null
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const hydrated = useAuthHydrated()
  const { guestSessionId, expiresAt, isAuthenticated, setSession, clearSession } = useAuthStore()

  useEffect(() => {
    if (!hydrated) return

    const initializeAuth = async () => {
      if (isAuthenticated && guestSessionId) {
        return
      }

      if (guestSessionId && expiresAt && authService.isSessionValid(expiresAt)) {
        setSession(guestSessionId, expiresAt)
        return
      }

      try {
        const session = await authService.createGuestSession()
        setSession(session.guest_session_id, session.expires_at)
      } catch {
        clearSession()
      }
    }

    initializeAuth()
    return () => {}
  }, [hydrated])

  return <AuthContext.Provider value={{ guestSessionId, isAuthenticated }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
