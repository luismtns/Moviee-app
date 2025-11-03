import { useFavorites } from '@/hooks/useFavorites'
import { notifications } from '@/utils/notifications'
import { IonButton, IonIcon } from '@ionic/react'
import { heart, heartOutline } from 'ionicons/icons'
import { memo } from 'react'

interface MovieFavoriteButtonProps {
  movieId: number
  movieTitle: string
}

const MovieFavoriteButton: React.FC<MovieFavoriteButtonProps> = memo(({ movieId, movieTitle }) => {
  const { isFavorite, toggleFavorite, isLoading, canUseFavorites } = useFavorites()
  const isMovieFavorite = isFavorite(movieId)

  const handleClick = async () => {
    if (!canUseFavorites) return

    const wasFavorite = isMovieFavorite

    await toggleFavorite(movieId)

    const message = wasFavorite ? `Removido dos favoritos: ${movieTitle}` : `Adicionado aos favoritos: ${movieTitle}`
    notifications.info(message)
  }

  return (
    <IonButton
      fill='clear'
      onClick={handleClick}
      disabled={isLoading || !canUseFavorites}
      aria-label={isMovieFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
      <IonIcon icon={isMovieFavorite ? heart : heartOutline} color={isMovieFavorite ? 'danger' : 'medium'} />
    </IonButton>
  )
})

export default MovieFavoriteButton
