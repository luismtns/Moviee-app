import api from '@/lib/tmdb.axios'
import type { Account, RequestToken, Session } from '@/types/Auth'

const TMDB_AUTH_URL = 'https://www.themoviedb.org/authenticate'

export const authService = {
  createRequestToken: async (): Promise<RequestToken> => {
    const response = await api.get('/authentication/token/new')
    return response.data
  },

  getAuthenticationUrl: (requestToken: string, redirectUrl?: string): string => {
    const url = `${TMDB_AUTH_URL}/${requestToken}`
    if (redirectUrl) {
      return `${url}?redirect_to=${encodeURIComponent(redirectUrl)}`
    }
    return url
  },

  createSession: async (requestToken: string): Promise<Session> => {
    const response = await api.post('/authentication/session/new', {
      request_token: requestToken,
    })
    return response.data
  },

  getAccountDetails: async (sessionId: string): Promise<Account> => {
    const response = await api.get('/account', {
      params: { session_id: sessionId },
    })
    return response.data
  },

  deleteSession: async (sessionId: string): Promise<void> => {
    await api.delete('/authentication/session', {
      data: { session_id: sessionId },
    })
  },

  isSessionValid: (sessionId: string | null): boolean => {
    return !!sessionId
  },
}
