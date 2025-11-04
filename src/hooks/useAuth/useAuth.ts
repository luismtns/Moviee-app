import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/authStore'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { getCurrentRedirectUrl } from '@/utils/navigation.utils'

export const useAuth = () => {
  const { sessionId, accountId, account, isAuthenticated, setRequestToken, clearSession } = useAuthStore()

  const startAuthentication = async (): Promise<string> => {
    try {
      const tokenData = await authService.createRequestToken()
      setRequestToken(tokenData.request_token)

      const redirectUrl = getCurrentRedirectUrl()
      return authService.getAuthenticationUrl(tokenData.request_token, redirectUrl)
    } catch (error) {
      console.error('Failed to start authentication:', error)
      throw error
    }
  }

  const logout = async (): Promise<void> => {
    if (sessionId) {
      try {
        await authService.deleteSession(sessionId)
      } catch (error) {
        console.error('Failed to delete session:', error)
      }
    }
    clearSession()
    useFavoritesStore.getState().clear()
  }

  return {
    sessionId,
    accountId,
    account,
    isAuthenticated,
    startAuthentication,
    logout,
  }
}
