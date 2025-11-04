import { IonButton, IonCard, IonIcon, IonText } from '@ionic/react'
import { sad } from 'ionicons/icons'
import React, { ReactNode } from 'react'
import './EmptyState.css'

interface EmptyStateProps {
  icon: string
  message: string
  title?: string
  actionLabel?: string
  onAction?: () => void
  actionHref?: string
  children?: ReactNode
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = sad,
  message = 'Poxa parece que algo deu errado, recarregue e tente novamente',
  title,
  actionLabel,
  onAction,
  actionHref,
  children,
}) => {
  return (
    <IonCard className='empty-state'>
      <div className='empty-state-content'>
        <IonIcon icon={icon} className='empty-state-icon' />

        {title && (
          <IonText>
            <h2 className='empty-state-title '>{title}</h2>
          </IonText>
        )}

        <IonText color='medium'>
          <p className='empty-state-message'>{message}</p>
        </IonText>

        {actionLabel && onAction && (
          <IonButton onClick={onAction} href={actionHref} className='empty-state-action'>
            {actionLabel}
          </IonButton>
        )}

        {children}
      </div>
    </IonCard>
  )
}

export default EmptyState
