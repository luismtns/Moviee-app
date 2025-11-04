import { useAuthStore } from '@/stores/authStore'

export const useGuestSession = () => {
  const { sessionId, isAuthenticated } = useAuthStore()

  return {
    sessionId,
    isAuthenticated,
    canFavorite: isAuthenticated && !!sessionId,
  }
}
