import { useFavorites } from '@/hooks/useFavorites'
import { IonChip, IonIcon, IonLabel } from '@ionic/react'
import { heart, heartOutline } from 'ionicons/icons'
import { memo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './FavoriteButton.css'

interface FavoriteButtonProps {
  movieId: number
}

const FavoriteButton: React.FC<FavoriteButtonProps> = memo(({ movieId }) => {
  const { isFavorite, toggleFavorite, canUseFavorites } = useFavorites()
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  const isFav = isFavorite(movieId)

  const handleClick = async () => {
    if (!canUseFavorites) {
      history.push('/favorites')
      return
    }
    setIsLoading(true)
    try {
      await toggleFavorite(movieId)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <IonChip
      key={`fav-button-${isFav}`}
      color={isFav ? 'danger' : 'medium'}
      onClick={handleClick}
      disabled={isLoading}
      className='favorite-button'>
      <IonIcon icon={isFav ? heart : heartOutline} />
      <IonLabel>{isFav ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}</IonLabel>
    </IonChip>
  )
})

export default FavoriteButton
