export interface RequestToken {
  success: boolean
  expires_at: string
  request_token: string
}

export interface Session {
  success: boolean
  session_id: string
}

export interface Account {
  avatar: {
    gravatar: {
      hash: string
    }
    tmdb: {
      avatar_path: string | null
    }
  }
  id: number
  iso_639_1: string
  iso_3166_1: string
  name: string
  include_adult: boolean
  username: string
}

export interface AuthState {
  sessionId: string | null
  accountId: number | null
  requestToken: string | null
  isAuthenticated: boolean
  account: Account | null
}

export interface AuthContextValue extends AuthState {
  startAuthentication: () => Promise<string>
  completeAuthentication: (approvedToken: string) => Promise<void>
  clearSession: () => void
  isSessionValid: () => boolean
}
