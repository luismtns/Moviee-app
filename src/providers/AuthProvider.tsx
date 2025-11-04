import { useAuthHydrated } from '@/hooks'
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/authStore'
import React, { useEffect, type ReactNode } from 'react'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated])

  return <>{children}</>
}
