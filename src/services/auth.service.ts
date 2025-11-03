import api from '@/lib/tmdb.axios'
import type { GuestSession } from '@/types/Auth'

export const authService = {
  createGuestSession: async (): Promise<GuestSession> => {
    const response = await api.post('/authentication/guest_session/new')
    return response.data
  },

  isSessionValid: (expiresAt: string | null): boolean => {
    if (!expiresAt) return false
    return new Date(expiresAt) > new Date()
  }
}