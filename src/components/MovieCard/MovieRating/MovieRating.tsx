import { IonBadge, IonIcon } from '@ionic/react'
import { star } from 'ionicons/icons'
import { memo } from 'react'

interface MovieRatingProps {
  rating: number
  showIcon?: boolean
  color?: string
}

const MovieRating: React.FC<MovieRatingProps> = memo(({ rating, showIcon = true, color = 'warning' }) => {
  return (
    <IonBadge color={color}>
      {showIcon && <IonIcon icon={star} className='ion-margin-end' />}
      {rating.toFixed(1)}
    </IonBadge>
  )
})

MovieRating.displayName = 'MovieRating'

export default MovieRating
