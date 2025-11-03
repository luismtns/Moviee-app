import { movieUtils } from '@/utils/movie.utils'
import { IonImg } from '@ionic/react'
import { memo } from 'react'
import './MoviePoster.css'

interface MoviePosterProps {
  posterPath: string | null
  title: string
}

const MoviePoster: React.FC<MoviePosterProps> = memo(({ posterPath, title }) => {
  const posterUrl = movieUtils.getImageUrl(posterPath, 'w500')

  return <IonImg src={posterUrl} alt={title} className='movie-poster' />
})

export default MoviePoster
