import { IonCardContent, IonCardSubtitle, IonCardTitle } from '@ionic/react'
import { memo } from 'react'
import './MovieInfo.css'

interface MovieInfoProps {
  title: string
  releaseDate?: string
}

const MovieInfo: React.FC<MovieInfoProps> = memo(({ title, releaseDate }) => {
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : ''

  return (
    <IonCardContent className='card-content'>
      {releaseYear && <IonCardSubtitle className='card-subtitle'>{releaseYear}</IonCardSubtitle>}
      <IonCardTitle className='card-title'>{title}</IonCardTitle>
    </IonCardContent>
  )
})

export default MovieInfo
