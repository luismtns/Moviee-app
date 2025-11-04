import { useFavorites } from '@/hooks/useFavorites'
import { notifications } from '@/utils/notifications'
import { IonButton, IonIcon } from '@ionic/react'
import { heart, heartDislike } from 'ionicons/icons'
import { memo } from 'react'

interface MovieFavoriteButtonProps {
  movieId: number
  movieTitle: string
  showDeleteIcon?: boolean
}

const MovieFavoriteButton: React.FC<MovieFavoriteButtonProps> = memo(
  ({ movieId, movieTitle, showDeleteIcon = false }) => {
    const { isFavorite, toggleFavorite, isLoading, canUseFavorites } = useFavorites()
    const isMovieFavorite = isFavorite(movieId)

    const handleClick = async (e: React.MouseEvent) => {
      e.stopPropagation()

      if (!canUseFavorites) return

      const wasFavorite = isMovieFavorite

      await toggleFavorite(movieId)

      const message = wasFavorite ? `Removido dos favoritos: ${movieTitle}` : `Adicionado aos favoritos: ${movieTitle}`
      notifications.info(message)
    }

    const icon = showDeleteIcon ? heartDislike : heart
    const iconColor = showDeleteIcon ? 'danger' : isMovieFavorite ? 'danger' : 'medium'
    const ariaLabel = showDeleteIcon
      ? 'Remover dos favoritos'
      : isMovieFavorite
      ? 'Remover dos favoritos'
      : 'Adicionar aos favoritos'

    return (
      <IonButton
        shape='round'
        size='small'
        color={'medium'}
        fill='clear'
        style={{
          opacity: showDeleteIcon || isMovieFavorite ? 1 : 0.8,
        }}
        onClick={handleClick}
        disabled={isLoading || !canUseFavorites}
        aria-label={ariaLabel}>
        <IonIcon size='large' icon={icon} color={iconColor} />
      </IonButton>
    )
  }
)

export default MovieFavoriteButton
