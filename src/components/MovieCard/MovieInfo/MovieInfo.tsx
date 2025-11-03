import { highlightText } from '@/utils/text.utils'
import { IonCardContent, IonCardSubtitle, IonCardTitle } from '@ionic/react'
import { memo } from 'react'
import './MovieInfo.css'

interface MovieInfoProps {
  title: string
  releaseDate?: string
  highlightQuery?: string
}

const MovieInfo: React.FC<MovieInfoProps> = memo(({ title, releaseDate, highlightQuery }) => {
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : ''
  const displayTitle = highlightQuery ? highlightText(title, highlightQuery) : title

  return (
    <IonCardContent className='card-content'>
      {releaseYear && <IonCardSubtitle className='card-subtitle'>{releaseYear}</IonCardSubtitle>}
      <IonCardTitle className='card-title'>{displayTitle}</IonCardTitle>
    </IonCardContent>
  )
})

export default MovieInfo
