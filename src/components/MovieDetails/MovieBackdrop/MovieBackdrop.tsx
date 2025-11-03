import { movieUtils } from '@/utils/movie.utils'
import { memo } from 'react'
import './MovieBackdrop.css'

interface MovieBackdropProps {
  backdropPath: string | null
}

const MovieBackdrop: React.FC<MovieBackdropProps> = memo(({ backdropPath }) => {
  const backdropUrl = movieUtils.getImageUrl(backdropPath, 'original')

  return (
    <div className='movie-backdrop' style={{ backgroundImage: `url(${backdropUrl})` }}>
      <div className='backdrop-overlay' />
    </div>
  )
})

export default MovieBackdrop
