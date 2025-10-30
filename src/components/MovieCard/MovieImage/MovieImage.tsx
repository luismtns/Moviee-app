import { movieUtils } from '@/utils/movie.utils'
import { IonImg } from '@ionic/react'
import { memo } from 'react'
import './MovieImage.css'

interface MovieImageProps {
  posterPath: string | null
  title: string
  className?: string
}

const MovieImage: React.FC<MovieImageProps> = memo(({ posterPath, title, className = '' }) => {
  const imageUrl = movieUtils.getImageUrl(posterPath) || '/placeholder.jpg'

  return <IonImg src={imageUrl} alt={`Poster do filme ${title}`} className={`movie-image ${className}`} />
})

MovieImage.displayName = 'MovieImage'

export default MovieImage
