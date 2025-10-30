import Loading from '@/components/Loading'
import MovieCard from '@/components/MovieCard/MovieCard'
import { useFavorites } from '@/hooks/useFavorites'
import { usePopularMovies } from '@/hooks/useMovies'
import { IonInfiniteScroll, IonInfiniteScrollContent, IonToast } from '@ionic/react'
import { useMemo, useState } from 'react'

const PopularMoviesDemo: React.FC = () => {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = usePopularMovies()

  const { favoritesCount } = useFavorites()

  // Memoize expensive calculation
  const allMovies = useMemo(() => data?.pages.flatMap((page) => page.results) || [], [data])

  const handleFavoriteToggle = (movieId: number, title: string, isFavorite: boolean) => {
    setToastMessage(isFavorite ? `${title} adicionado aos favoritos` : `${title} removido dos favoritos`)
    setShowToast(true)
  }

  const handleInfiniteScroll = (ev: CustomEvent<void>) => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
    ;(ev.target as HTMLIonInfiniteScrollElement).complete()
  }

  if (isLoading) {
    return <Loading variant='card-skeleton' count={5} />
  }

  if (error) {
    return (
      <div style={{ padding: '16px' }}>
        <Loading variant='spinner' message='Erro ao carregar filmes. Tente novamente.' />
      </div>
    )
  }

  return (
    <>
      <div className='ion-padding'>
        {allMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onFavoriteToggle={handleFavoriteToggle} />
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
    </>
  )
}

export default PopularMoviesDemo
