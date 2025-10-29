import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { heart } from 'ionicons/icons'
import { useMovieDetails } from '../hooks/useMovies'
import { useFavoritesStore } from '../stores/favoritesStore'
import './Tab2.css'

const Tab2: React.FC = () => {
  const { favoriteIds, removeFavorite } = useFavoritesStore()

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

const FavoriteMovieCard: React.FC<{ movieId: number; onRemove: (id: number) => void }> = ({ movieId, onRemove }) => {
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

  return (
    <IonCard>
      <div style={{ display: 'flex' }}>
        <IonImg
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          style={{ width: '100px', height: '150px', objectFit: 'cover' }}
        />
        <div style={{ flex: 1, padding: '16px' }}>
          <IonCardHeader>
            <IonCardTitle>{movie.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              <p>{movie.overview?.substring(0, 100)}...</p>
              <p>
                <strong>Nota:</strong> {movie.vote_average?.toFixed(1)}/10
              </p>
            </IonText>
            <IonButton fill='clear' color='danger' onClick={() => onRemove(movieId)}>
              <IonIcon icon={heart} />
              Remover dos favoritos
            </IonButton>
          </IonCardContent>
        </div>
      </div>
    </IonCard>
  )
}

export default Tab2
