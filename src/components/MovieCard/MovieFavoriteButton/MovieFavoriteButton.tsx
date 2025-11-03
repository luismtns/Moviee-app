import { useFavorites } from '@/hooks/useFavorites'
import { notifications } from '@/utils/notifications'
import { IonButton, IonIcon } from '@ionic/react'
import { heart } from 'ionicons/icons'
import { memo } from 'react'

interface MovieFavoriteButtonProps {
  movieId: number
  movieTitle: string
}

const MovieFavoriteButton: React.FC<MovieFavoriteButtonProps> = memo(({ movieId, movieTitle }) => {
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

  return (
    <IonButton
      shape='round'
      size='small'
      color={'medium'}
      fill='clear'
      style={{
        opacity: isMovieFavorite ? 1 : 0.8,
      }}
      onClick={handleClick}
      disabled={isLoading || !canUseFavorites}
      aria-label={isMovieFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
      <IonIcon size='large' icon={heart} color={isMovieFavorite ? 'danger' : 'medium'} />
    </IonButton>
  )
})

export default MovieFavoriteButton
