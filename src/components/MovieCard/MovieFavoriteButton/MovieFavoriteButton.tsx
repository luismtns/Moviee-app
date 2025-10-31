import { useFavorites } from '@/hooks/useFavorites'
import { IonButton, IonIcon, IonToast } from '@ionic/react'
import { heart, heartOutline } from 'ionicons/icons'
import { memo, useState } from 'react'

interface MovieFavoriteButtonProps {
  movieId: number
  movieTitle: string
  onToggle?: (movieId: number, title: string, isFavorite: boolean) => void
}

const MovieFavoriteButton: React.FC<MovieFavoriteButtonProps> = memo(({ movieId, movieTitle, onToggle }) => {
  const { isFavorite, toggleFavorite } = useFavorites()
  const isMovieFavorite = isFavorite(movieId)
  const [toastState, setToastState] = useState({ isOpen: false, message: '' })

  const handleClick = () => {
    const wasFavorite = isMovieFavorite
    toggleFavorite(movieId)
    onToggle?.(movieId, movieTitle, !wasFavorite)

    setToastState({
      isOpen: true,
      message: isMovieFavorite ? `${movieTitle} adicionado aos favoritos` : `${movieTitle} removido dos favoritos`,
    })
  }

  return (
    <>
      <IonButton
        fill='clear'
        onClick={handleClick}
        aria-label={isMovieFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
        <IonIcon icon={isMovieFavorite ? heart : heartOutline} color={isMovieFavorite ? 'danger' : 'medium'} />
      </IonButton>
      <IonToast
        isOpen={toastState.isOpen}
        onDidDismiss={() => setToastState((prev) => ({ ...prev, isOpen: false }))}
        message={toastState.message}
        duration={2000}
        position='bottom'
      />
    </>
  )
})

export default MovieFavoriteButton
