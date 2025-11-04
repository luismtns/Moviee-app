import { useFavorites } from '@/hooks/useFavorites'
import { notifications } from '@/utils/notifications'
import { IonButton, IonIcon, IonSpinner } from '@ionic/react'
import { heart, heartDislike, heartOutline } from 'ionicons/icons'
import { memo, useState } from 'react'
import { useHistory } from 'react-router-dom'

interface MovieFavoriteButtonProps {
  movieId: number
  movieTitle: string
  showDeleteIcon?: boolean
}

const MovieFavoriteButton: React.FC<MovieFavoriteButtonProps> = memo(
  ({ movieId, movieTitle, showDeleteIcon = false }) => {
    const { isFavorite, toggleFavorite, canUseFavorites } = useFavorites()
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    const isFav = isFavorite(movieId)

    const handleClick = async (e: React.MouseEvent) => {
      e.stopPropagation()

      if (!canUseFavorites) {
        history.push('/favorites')
        return
      }

      const wasFav = isFav
      setIsLoading(true)
      try {
        await toggleFavorite(movieId)
        const message = wasFav ? `Removido dos favoritos: ${movieTitle}` : `Adicionado aos favoritos: ${movieTitle}`
        notifications.info(message)
      } catch {
        notifications.error('Erro ao atualizar favorito')
      } finally {
        setIsLoading(false)
      }
    }

    const icon = showDeleteIcon ? heartDislike : isFav ? heart : heartOutline
    const iconColor = showDeleteIcon ? 'danger' : isFav ? 'danger' : 'medium'
    const ariaLabel = showDeleteIcon
      ? 'Remover dos favoritos'
      : isFav
      ? 'Remover dos favoritos'
      : 'Adicionar aos favoritos'

    return (
      <IonButton
        key={`movie-fav-button-${isFav}`}
        shape='round'
        size='small'
        color='medium'
        fill='clear'
        style={{ opacity: showDeleteIcon || isFav ? 1 : 0.8 }}
        onClick={handleClick}
        disabled={isLoading}
        aria-label={ariaLabel}>
        {isLoading ? <IonSpinner name='crescent' /> : <IonIcon size='large' icon={icon} color={iconColor} />}
      </IonButton>
    )
  }
)

export default MovieFavoriteButton
