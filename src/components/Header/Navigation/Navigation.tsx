import { IonButton, IonIcon, IonToolbar } from '@ionic/react'
import { heart, home } from 'ionicons/icons'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './Navigation.css'

export const Navigation: React.FC = () => {
  const history = useHistory()
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const handleHomeClick = () => {
    history.push('/')
  }

  const handleFavoritesClick = () => {
    history.push('/favorites')
  }

  return (
    <IonToolbar className='navigation'>
      <IonButton
        fill={isActive('/home') ? 'solid' : 'clear'}
        color={isActive('/home') ? 'primary' : 'medium'}
        onClick={handleHomeClick}
        className='nav-button'>
        <IonIcon icon={home} />
        Home
      </IonButton>

      <IonButton
        fill={isActive('/favorites') ? 'solid' : 'clear'}
        color={isActive('/favorites') ? 'primary' : 'medium'}
        onClick={handleFavoritesClick}
        className='nav-button'>
        <IonIcon icon={heart} />
        Favoritos
      </IonButton>
    </IonToolbar>
  )
}
