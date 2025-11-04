import { useAuth } from '@/hooks'
import { redirectToExternalUrl } from '@/utils/navigation.utils'
import { IonButton, IonIcon } from '@ionic/react'
import { logInOutline, logOutOutline } from 'ionicons/icons'
import React from 'react'
import './LoginButton.css'

type LoginButtonProps = {
  showLogout?: boolean
}

const LoginButton: React.FC<LoginButtonProps> = ({ showLogout = false }) => {
  const { isAuthenticated, startAuthentication, logout } = useAuth()

  const handleLogin = async () => {
    try {
      const authUrl = await startAuthentication()
      redirectToExternalUrl(authUrl)
    } catch (error) {
      console.error('Failed to start authentication:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  }

  if (isAuthenticated && showLogout) {
    return (
      <IonButton fill='solid' size='small' onClick={handleLogout}>
        <IonIcon slot='start' icon={logOutOutline} />
        Logout
      </IonButton>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <IonButton fill='solid' size='small' onClick={handleLogin}>
      <IonIcon slot='start' icon={logInOutline} />
      Login com TMDB
    </IonButton>
  )
}

export default React.memo(LoginButton)
