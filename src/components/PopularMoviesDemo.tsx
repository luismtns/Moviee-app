import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react'
import { heart, heartOutline } from 'ionicons/icons'
import { useState } from 'react'
import { useFavorites } from '../hooks/useFavorites'
import { usePopularMovies } from '../hooks/useMovies'
import { movieUtils } from '../utils/movie.utils'

const PopularMoviesDemo: React.FC = () => {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = usePopularMovies()

  const { isFavorite, toggleFavorite, favoritesCount } = useFavorites()

  const allMovies = data?.pages.flatMap((page) => page.results) || []

  const handleToggleFavorite = (movieId: number, title: string) => {
    const wasFavorite = isFavorite(movieId)
    toggleFavorite(movieId)

    setToastMessage(wasFavorite ? `${title} removido dos favoritos` : `${title} adicionado aos favoritos`)
    setShowToast(true)
  }

  const handleInfiniteScroll = (ev: CustomEvent<void>) => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
    ;(ev.target as HTMLIonInfiniteScrollElement).complete()
  }

  if (isLoading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Filmes Populares</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding' fullscreen>
          <div style={{ textAlign: 'center', marginTop: '50%' }}>
            <IonSpinner name='crescent' />
            <p>Carregando filmes...</p>
          </div>
        </IonContent>
      </IonPage>
    )
  }

  if (error) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Filmes Populares</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding' fullscreen>
          <IonCard color='danger'>
            <IonCardContent>
              <p>Erro ao carregar filmes. Verifique sua conexão e tente novamente.</p>
              <p>Detalhes: {error.toString()}</p>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    )
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filmes Populares ({favoritesCount} favoritos)</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='ion-padding'>
          {allMovies.map((movie) => (
            <IonCard key={movie.id}>
              <div style={{ display: 'flex' }}>
                <img
                  src={movieUtils.getImageUrl(movie.poster_path, 'w200') || '/placeholder.jpg'}
                  alt={movie.title}
                  style={{
                    width: '120px',
                    height: '180px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <div style={{ flex: 1, marginLeft: '16px' }}>
                  <IonCardHeader>
                    <IonCardTitle>{movie.title}</IonCardTitle>
                    <p style={{ margin: 0, opacity: 0.7 }}>
                      {movie.release_date} • ⭐ {movie.vote_average.toFixed(1)}
                    </p>
                  </IonCardHeader>
                  <IonCardContent>
                    <p style={{ fontSize: '14px', lineHeight: '1.4' }}>
                      {movie.overview.length > 150 ? `${movie.overview.substring(0, 150)}...` : movie.overview}
                    </p>
                    <IonButton fill='clear' onClick={() => handleToggleFavorite(movie.id, movie.title)}>
                      <IonIcon
                        icon={isFavorite(movie.id) ? heart : heartOutline}
                        color={isFavorite(movie.id) ? 'danger' : 'medium'}
                      />
                    </IonButton>
                  </IonCardContent>
                </div>
              </div>
            </IonCard>
          ))}
        </div>

        <IonInfiniteScroll onIonInfinite={handleInfiniteScroll} disabled={!hasNextPage}>
          <IonInfiniteScrollContent loadingSpinner='crescent' loadingText='Carregando mais filmes...' />
        </IonInfiniteScroll>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position='bottom'
        />
      </IonContent>
    </IonPage>
  )
}

export default PopularMoviesDemo
