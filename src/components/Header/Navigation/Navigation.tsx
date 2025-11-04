import { IonButton, IonButtons, IonIcon } from '@ionic/react'
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

  return (
    <IonButtons slot='primary' className='navigation ion-display-md-flex ion-display-none'>
      <IonButton
        fill={isActive('/home') ? 'solid' : 'clear'}
        color={isActive('/home') ? 'primary' : 'medium'}
        href='/home'
        className='nav-button'>
        <IonIcon icon={home} />
        Home
      </IonButton>

      <IonButton
        fill={isActive('/favorites') ? 'solid' : 'clear'}
        color={isActive('/favorites') ? 'primary' : 'medium'}
        href='/favorites'
        className='nav-button'>
        <IonIcon icon={heart} />
        Favoritos
      </IonButton>
    </IonButtons>
  )
}
