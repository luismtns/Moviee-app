export interface GuestSession {
  success: boolean
  guest_session_id: string
  expires_at: string
}

export interface AuthState {
  guestSessionId: string | null
  expiresAt: string | null
  isAuthenticated: boolean
}

export interface AuthContextValue extends AuthState {
  initializeGuestSession: () => Promise<void>
  clearSession: () => void
  isSessionExpired: () => boolean
  refreshSession: () => Promise<void>
}
