import { useFavorites } from '@/hooks/useFavorites'
import { IonChip, IonIcon, IonLabel } from '@ionic/react'
import { heart, heartOutline } from 'ionicons/icons'
import { memo } from 'react'
import './FavoriteButton.css'

interface FavoriteButtonProps {
  movieId: number
}

const FavoriteButton: React.FC<FavoriteButtonProps> = memo(({ movieId }) => {
  const { isFavorite, toggleFavorite } = useFavorites()
  const isFav = isFavorite(movieId)

  return (
    <IonChip color={isFav ? 'danger' : 'medium'} onClick={() => toggleFavorite(movieId)} className='favorite-button'>
      <IonIcon icon={isFav ? heart : heartOutline} />
      <IonLabel>{isFav ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}</IonLabel>
    </IonChip>
  )
})

export default FavoriteButton
