import { useAuth } from '@/providers'

export const useGuestSession = () => {
  const { guestSessionId, isAuthenticated } = useAuth()

  return {
    guestSessionId,
    isAuthenticated,
    canRate: isAuthenticated && !!guestSessionId,
  }
}
