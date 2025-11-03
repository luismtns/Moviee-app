import type { Genre } from '@/types/Movie'
import { IonChip, IonText } from '@ionic/react'
import { memo } from 'react'
import './MovieHeader.css'

interface MovieHeaderProps {
  title: string
  genres?: Genre[]
}

const MovieHeader: React.FC<MovieHeaderProps> = memo(({ title, genres }) => {
  return (
    <div className='movie-header'>
      <IonText>
        <h1>{title}</h1>
      </IonText>
      {genres && genres.length > 0 && (
        <div className='movie-genres'>
          {genres.map((genre) => (
            <IonChip key={genre.id} disabled color='primary'>
              {genre.name}
            </IonChip>
          ))}
        </div>
      )}
    </div>
  )
})

export default MovieHeader
