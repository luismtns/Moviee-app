import { movieUtils } from '@/utils/movie.utils'
import { IonImg, IonSkeletonText } from '@ionic/react'
import clsx from 'clsx'
import { memo, useMemo, useState } from 'react'
import './MovieImage.css'

interface MovieImageProps {
  posterPath: string | null
  title: string
  className?: string
}

const MovieImage: React.FC<MovieImageProps> = memo(({ posterPath, title, className = '' }) => {
  const imageUrl = useMemo(() => movieUtils.getImageUrl(posterPath, 'w500'), [posterPath])

  const [isLoading, setIsLoading] = useState(true)
  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className='movie-image-wrapper'>
      <IonSkeletonText
        animated={isLoading}
        className={clsx(
          'movie-image placeholder',
          {
            'ion-display-none': !isLoading,
          },
          className
        )}></IonSkeletonText>
      <IonImg
        src={imageUrl}
        alt={`Poster do filme ${title}`}
        className={clsx(
          'movie-image',
          {
            loading: isLoading,
          },
          className
        )}
        onIonImgDidLoad={handleImageLoad}
      />
    </div>
  )
})

export default MovieImage
