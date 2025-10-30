import type { Movie } from '@/types/Movie'
import { IonCard } from '@ionic/react'
import { memo } from 'react'
import './MovieCard.css'
import { MovieActions, MovieFavoriteButton, MovieImage, MovieInfo, MovieRating } from './index'

interface MovieCardProps {
  movie: Movie
  onFavoriteToggle?: (movieId: number, title: string, isFavorite: boolean) => void
}

const MovieCard: React.FC<MovieCardProps> = memo(({ movie, onFavoriteToggle }) => {
  return (
    <IonCard className='movie-card'>
      <MovieImage posterPath={movie.poster_path} title={movie.title} />

      <MovieInfo title={movie.title} releaseDate={movie.release_date} />

      <MovieActions>
        <MovieRating rating={movie.vote_average} />
        <MovieFavoriteButton movieId={movie.id} movieTitle={movie.title} onToggle={onFavoriteToggle} />
      </MovieActions>
    </IonCard>
  )
})

MovieCard.displayName = 'MovieCard'

export default MovieCard
