import type { Movie } from '@/types/Movie'
import { IonCard } from '@ionic/react'
import { memo } from 'react'
import { useHistory } from 'react-router-dom'
import './MovieCard.css'
import { MovieActions, MovieFavoriteButton, MovieImage, MovieInfo, MovieRating } from './index'

interface MovieCardProps {
  movie: Movie
  highlightQuery?: string
}

const MovieCard: React.FC<MovieCardProps> = memo(({ movie, highlightQuery }) => {
  const history = useHistory()

  const handleCardClick = () => {
    history.push(`/movie/${movie.id}`)
  }

  return (
    <IonCard className='movie-card' button onClick={handleCardClick}>
      <div className='movie-card-wrapper'>
        <MovieImage posterPath={movie.poster_path} title={movie.title} />

        <MovieInfo title={movie.title} releaseDate={movie.release_date} highlightQuery={highlightQuery} />

        <MovieActions>
          <MovieRating rating={movie.vote_average} />
          <MovieFavoriteButton movieId={movie.id} movieTitle={movie.title} />
        </MovieActions>
      </div>
    </IonCard>
  )
})

export default MovieCard
