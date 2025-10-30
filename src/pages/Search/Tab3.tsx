import MovieCard from '@/components/MovieCard/MovieCard'
import { useSearchMovies } from '@/hooks/useMovies'
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonSearchbar,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useMemo, useState } from 'react'
import './Tab3.css'

const Tab3: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const { data: searchResults, isLoading, error } = useSearchMovies(searchText)

  // Flatten infinite data with memoization
  const movies = useMemo(() => searchResults?.pages.flatMap((page) => page.results) || [], [searchResults])

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
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  )
}

export default Tab3
