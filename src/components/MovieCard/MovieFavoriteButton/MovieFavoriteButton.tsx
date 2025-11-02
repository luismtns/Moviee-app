import { useFavorites } from '@/hooks/useFavorites'
import { notifications } from '@/utils/notifications'
import { IonButton, IonIcon } from '@ionic/react'
import { heart, heartOutline } from 'ionicons/icons'
import { memo } from 'react'

interface MovieFavoriteButtonProps {
  movieId: number
  movieTitle: string
  onToggle?: (movieId: number, title: string, isFavorite: boolean) => void
}

const MovieFavoriteButton: React.FC<MovieFavoriteButtonProps> = memo(({ movieId, movieTitle, onToggle }) => {
  const { isFavorite, toggleFavorite } = useFavorites()
  const isMovieFavorite = isFavorite(movieId)

  const handleClick = () => {
    const wasFavorite = isMovieFavorite
    toggleFavorite(movieId)
    onToggle?.(movieId, movieTitle, !wasFavorite)

    const message = wasFavorite ? `Removido dos favoritos: ${movieTitle}` : `Adicionado aos favoritos: ${movieTitle}`

    notifications.info(message)
  }

  return (
    <IonButton
      fill='clear'
      onClick={handleClick}
      aria-label={isMovieFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
      <IonIcon icon={isMovieFavorite ? heart : heartOutline} color={isMovieFavorite ? 'danger' : 'medium'} />
    </IonButton>
  )
})

export default MovieFavoriteButton
