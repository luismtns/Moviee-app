import { IonCardContent, IonCol, IonGrid, IonRow } from '@ionic/react'
import { memo, type ReactNode } from 'react'
import './MovieActions.css'

interface MovieActionsProps {
  children: ReactNode
  className?: string
}

const MovieActions: React.FC<MovieActionsProps> = memo(({ children, className = '' }) => {
  return (
    <IonCardContent className={`movie-actions ${className}`}>
      <IonGrid>
        <IonRow className='ion-justify-content-between ion-align-items-center'>
          {Array.isArray(children) ? (
            children.map((child, index) => (
              <IonCol key={index} size='auto'>
                {child}
              </IonCol>
            ))
          ) : (
            <IonCol size='auto'>{children}</IonCol>
          )}
        </IonRow>
      </IonGrid>
    </IonCardContent>
  )
})

MovieActions.displayName = 'MovieActions'

export default MovieActions
