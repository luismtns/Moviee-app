import { useSearchMovies } from '@/hooks/useMovies'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { Movie } from '@/types/Movie'
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonSpinner,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { heart, heartOutline } from 'ionicons/icons'
import { useState } from 'react'
import './Tab3.css'

const Tab3: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const { data: searchResults, isLoading, error } = useSearchMovies(searchText)
  const { isFavorite, toggleFavorite } = useFavoritesStore()

  // Flatten infinite data
  const movies = searchResults?.pages.flatMap((page) => page.results) || []

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Buscar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Buscar</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value!)}
          placeholder='Buscar filmes...'
          debounce={500}
        />

        {isLoading && searchText && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <IonSpinner />
            <IonText>
              <p>Buscando filmes...</p>
            </IonText>
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <IonText color='danger'>
              <p>Erro na busca. Tente novamente.</p>
            </IonText>
          </div>
        )}

        {!searchText && (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <IonText color='medium'>
              <h2>Digite para buscar filmes</h2>
              <p>Use a barra de busca acima</p>
            </IonText>
          </div>
        )}

        {searchText && movies.length === 0 && !isLoading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <IonText color='medium'>
              <p>Nenhum filme encontrado para "{searchText}"</p>
            </IonText>
          </div>
        )}

        {movies.length > 0 && (
          <IonList>
            {movies.map((movie: Movie) => (
              <IonItem key={movie.id}>
                <IonThumbnail slot='start'>
                  <IonImg
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : 'https://via.placeholder.com/200x300?text=No+Image'
                    }
                    alt={movie.title}
                  />
                </IonThumbnail>
                <IonLabel>
                  <h2>{movie.title}</h2>
                  <p>{movie.release_date?.split('-')[0]}</p>
                  <p>{movie.overview?.substring(0, 100)}...</p>
                  <p>
                    <strong>Nota:</strong> {movie.vote_average?.toFixed(1)}/10
                  </p>
                </IonLabel>
                <IonButton
                  slot='end'
                  fill='clear'
                  color={isFavorite(movie.id) ? 'danger' : 'medium'}
                  onClick={() => toggleFavorite(movie.id)}>
                  <IonIcon icon={isFavorite(movie.id) ? heart : heartOutline} />
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  )
}

export default Tab3
