import dayjs from '@/lib/dayjs'
import { IonChip, IonIcon, IonLabel } from '@ionic/react'
import { calendar, star, time } from 'ionicons/icons'
import { memo } from 'react'
import './MovieMeta.css'

interface MovieMetaProps {
  releaseDate: string
  voteAverage: number
  runtime?: number
}

const MovieMeta: React.FC<MovieMetaProps> = memo(({ releaseDate, voteAverage, runtime }) => {
  const releaseYear = dayjs(releaseDate).format('YYYY')
  const rating = voteAverage.toFixed(1)

  return (
    <div className='movie-meta'>
      <IonChip disabled color='tertiary'>
        <IonIcon icon={calendar} />
        <IonLabel>{releaseYear}</IonLabel>
      </IonChip>

      <IonChip disabled color='warning'>
        <IonIcon icon={star} />
        <IonLabel>{rating}</IonLabel>
      </IonChip>

      {runtime && (
        <IonChip disabled color='secondary'>
          <IonIcon icon={time} />
          <IonLabel>{runtime}min</IonLabel>
        </IonChip>
      )}
    </div>
  )
})

export default MovieMeta
