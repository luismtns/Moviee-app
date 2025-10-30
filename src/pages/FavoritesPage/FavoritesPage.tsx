import MovieCard from '@/components/MovieCard/MovieCard'
import { useFavorites } from '@/hooks/useFavorites'
import { useMovieDetails } from '@/hooks/useMovies'
import { IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react'
import React, { memo } from 'react'
import './FavoritesPage.css'

const FavoritesPage: React.FC = () => {
  const { favoriteIds, removeFavorite } = useFavorites()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Favoritos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Favoritos</IonTitle>
          </IonToolbar>
        </IonHeader>

        {favoriteIds.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <IonText color='medium'>
              <h2>Nenhum filme favorito ainda</h2>
              <p>Adicione filmes aos favoritos na aba Popular</p>
            </IonText>
          </div>
        ) : (
          <div style={{ padding: '16px' }}>
            {favoriteIds.map((movieId: number) => (
              <FavoriteMovieCard key={movieId} movieId={movieId} onRemove={removeFavorite} />
            ))}
          </div>
        )}
      </IonContent>
    </IonPage>
  )
}

const FavoriteMovieCard: React.FC<{ movieId: number; onRemove: (id: number) => void }> = memo(
  ({ movieId, onRemove }) => {
    const { data: movie, isLoading } = useMovieDetails(movieId)

    if (isLoading) {
      return (
        <IonCard>
          <IonCardContent>
            <IonText>Carregando...</IonText>
          </IonCardContent>
        </IonCard>
      )
    }

    if (!movie) return null

    return <MovieCard movie={movie} />
  }
)

export default FavoritesPage
