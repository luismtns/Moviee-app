import { useAuthHydrated } from '@/hooks'
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/authStore'
import { getCurrentPathname, getUrlParams, replaceHistoryState } from '@/utils/navigation.utils'
import React, { useEffect, type ReactNode } from 'react'

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const hydrated = useAuthHydrated()
  const { sessionId, requestToken, isAuthenticated, setSession, clearSession } = useAuthStore()

  useEffect(() => {
    if (!hydrated) return

    const initializeAuth = async () => {
      if (isAuthenticated && sessionId && authService.isSessionValid(sessionId)) {
        try {
          const account = await authService.getAccountDetails(sessionId)
          setSession(sessionId, account)
        } catch {
          clearSession()
        }
        return
      }

      const urlParams = getUrlParams()
      const approvedToken = urlParams.get('request_token')
      const approved = urlParams.get('approved')

      if (approvedToken && approved === 'true' && requestToken === approvedToken) {
        try {
          const session = await authService.createSession(approvedToken)
          const account = await authService.getAccountDetails(session.session_id)
          setSession(session.session_id, account)

          replaceHistoryState(getCurrentPathname())
        } catch (error) {
          console.error('Failed to create session:', error)
          clearSession()
        }
      }
    }

    initializeAuth()
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated])

  return <>{children}</>
}
