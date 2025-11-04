import { useAuthStore } from '@/stores/authStore'

export const useAuth = () => {
  const { guestSessionId, isAuthenticated } = useAuthStore()

  return {
    guestSessionId,
    isAuthenticated,
  }
}
