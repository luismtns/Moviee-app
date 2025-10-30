import type { Movie } from '@/types/Movie'
import { IonItem, IonList, IonToast } from '@ionic/react'
import { memo, useCallback, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import Loading from '../Loading'
import MovieCard from '../MovieCard/MovieCard'
import './VirtualizedMovieList.css'

interface VirtualizedMovieListProps {
  movies: Movie[]
  onLoadMore?: () => void
  isLoading?: boolean
  isFetchingNextPage?: boolean
}

const VirtualizedMovieList: React.FC<VirtualizedMovieListProps> = memo(
  ({ movies, onLoadMore, isLoading = false, isFetchingNextPage = false }) => {
    const [toastState, setToastState] = useState({ isOpen: false, message: '' })

    const handleFavoriteToggle = useCallback((movieId: number, title: string, isFavorite: boolean) => {
      setToastState({
        isOpen: true,
        message: isFavorite ? `${title} adicionado aos favoritos` : `${title} removido dos favoritos`,
      })
    }, [])

    const ListItem = memo(({ index }: { index: number }) => {
      const movie = movies[index]
      if (!movie) return null

      return (
        <IonItem className='movie-list-item'>
          <MovieCard movie={movie} onFavoriteToggle={handleFavoriteToggle} />
        </IonItem>
      )
    })

    if (isLoading && movies.length === 0) {
      return <Loading variant='card-skeleton' count={6} />
    }

    if (movies.length === 0) {
      return (
        <div className='ion-text-center ion-padding'>
          <p>Nenhum filme encontrado</p>
        </div>
      )
    }

    return (
      <>
        <IonList className='movie-list'>
          <Virtuoso
            style={{ height: '100vh' }}
            totalCount={movies.length}
            itemContent={(index: number) => <ListItem index={index} />}
            endReached={onLoadMore}
            overscan={10}
            components={{
              Footer: () =>
                isFetchingNextPage && (
                  <div className='ion-padding ion-text-center'>
                    <Loading variant='spinner' message='Carregando mais filmes...' />
                  </div>
                ),
            }}
          />
        </IonList>

        <IonToast
          isOpen={toastState.isOpen}
          onDidDismiss={() => setToastState((prev) => ({ ...prev, isOpen: false }))}
          message={toastState.message}
          duration={2000}
          position='bottom'
        />
      </>
    )
  }
)

VirtualizedMovieList.displayName = 'VirtualizedMovieList'

export default VirtualizedMovieList
