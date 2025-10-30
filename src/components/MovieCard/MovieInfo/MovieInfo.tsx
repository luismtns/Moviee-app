import { IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react'
import { memo } from 'react'

interface MovieInfoProps {
  title: string
  releaseDate?: string
  subtitle?: string
}

const MovieInfo: React.FC<MovieInfoProps> = memo(({ title, releaseDate, subtitle }) => {
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : ''
  const displaySubtitle = subtitle || releaseYear

  return (
    <IonCardHeader>
      <IonCardTitle>{title}</IonCardTitle>
      {displaySubtitle && <IonCardSubtitle>{displaySubtitle}</IonCardSubtitle>}
    </IonCardHeader>
  )
})

MovieInfo.displayName = 'MovieInfo'

export default MovieInfo
