import { useAuth } from '@/hooks'
import { IonButton, IonIcon, IonItem, IonLabel, IonPopover, IonText } from '@ionic/react'
import { heartCircle, logOutOutline, personCircleOutline } from 'ionicons/icons'
import React, { useState } from 'react'
import './UserAvatar.css'

const UserAvatar: React.FC = () => {
  const { account, logout } = useAuth()
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [popoverEvent, setPopoverEvent] = useState<MouseEvent | undefined>(undefined)

  if (!account) {
    return null
  }

  const getInitials = (username: string): string => {
    return username
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleAvatarClick = (e: React.MouseEvent) => {
    setPopoverEvent(e.nativeEvent)
    setPopoverOpen(true)
  }

  const handleLogout = async () => {
    setPopoverOpen(false)
    try {
      await logout()
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  }

  return (
    <>
      <IonButton fill='clear' size='small' onClick={handleAvatarClick} className='user-avatar-button'>
        <div className='user-avatar'>
          <IonText>{getInitials(account.username)}</IonText>
        </div>
      </IonButton>

      <IonPopover isOpen={popoverOpen} event={popoverEvent} onDidDismiss={() => setPopoverOpen(false)}>
        <div className='user-menu'>
          <div className='user-menu-header'>
            <IonIcon icon={personCircleOutline} className='user-menu-icon' />
            <div className='user-menu-info'>
              <IonText className='user-menu-username'>{account.username}</IonText>
              <IonText className='user-menu-name'>{account.name}</IonText>
            </div>
          </div>
          <IonItem button detail={false} href='/favorites'>
            <IonIcon icon={heartCircle} slot='start' />
            <IonLabel>Meus favoritos</IonLabel>
          </IonItem>
          <IonItem button detail={false} onClick={handleLogout}>
            <IonIcon icon={logOutOutline} slot='start' />
            <IonLabel>Logout</IonLabel>
          </IonItem>
        </div>
      </IonPopover>
    </>
  )
}

export default React.memo(UserAvatar)
