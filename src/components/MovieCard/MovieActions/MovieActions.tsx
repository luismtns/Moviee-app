import { IonCardHeader, IonCol, IonGrid, IonRow } from '@ionic/react'
import { memo, type ReactNode } from 'react'
import './MovieActions.css'

interface MovieActionsProps {
  children: ReactNode
}

const MovieActions: React.FC<MovieActionsProps> = memo(({ children }) => {
  return (
    <IonCardHeader className={`movie-header`}>
      <IonGrid className='ion-grid'>
        <IonRow className='ion-justify-content-between ion-align-items-center ion-row'>
          {Array.isArray(children) ? (
            children.map((child, index) => (
              <IonCol key={index} className='ion-col' size='auto'>
                {child}
              </IonCol>
            ))
          ) : (
            <IonCol className='ion-col' size='auto'>
              {children}
            </IonCol>
          )}
        </IonRow>
      </IonGrid>
    </IonCardHeader>
  )
})

export default MovieActions
