import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react'
import { memo } from 'react'

interface MovieSynopsisProps {
  overview: string
}

const MovieSynopsis: React.FC<MovieSynopsisProps> = memo(({ overview }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Sinopse</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{overview || 'Sinopse não disponível.'}</p>
      </IonCardContent>
    </IonCard>
  )
})

export default MovieSynopsis
