import type { Movie } from '@/types/Movie'
import { IonToast } from '@ionic/react'
import { forwardRef, memo, useCallback, useState } from 'react'
import { VirtuosoGrid, VirtuosoGridProps } from 'react-virtuoso'
import Loading from '../Loading'
import MovieCard from '../MovieCard/MovieCard'
import './VirtualizedMovieGrid.css'

interface VirtualizedMovieGridProps {
  movies: Movie[]
  onLoadMore?: () => void
  isLoading?: boolean
  isFetchingNextPage?: boolean
}

// Grid component definitions - must be outside component to prevent remounting
const gridComponents: VirtuosoGridProps<undefined, undefined>['components'] = {
  List: forwardRef(({ style, children, ...props }, ref) => (
    <div ref={ref} {...props} style={style} className='movie-grid-container'>
      {children}
    </div>
  )),
  Item: ({ children, ...props }) => (
    <div {...props} className='movie-grid-item'>
      {children}
    </div>
  ),
}

const VirtualizedMovieGrid: React.FC<VirtualizedMovieGridProps> = ({
  movies,
  onLoadMore,
  isLoading = false,
  isFetchingNextPage = false,
}) => {
  const [toastState, setToastState] = useState({ isOpen: false, message: '' })

  const handleFavoriteToggle = useCallback((movieId: number, title: string, isFavorite: boolean) => {
    setToastState({
      isOpen: true,
      message: isFavorite ? `${title} adicionado aos favoritos` : `${title} removido dos favoritos`,
    })
  }, [])

  const GridItem = memo(({ index }: { index: number }) => {
    const movie = movies[index]
    if (!movie) return null

    return <MovieCard movie={movie} onFavoriteToggle={handleFavoriteToggle} />
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
      <VirtuosoGrid
        className='virtuoso-grid'
        totalCount={movies.length}
        components={{
          ...gridComponents,
          Footer: () =>
            isFetchingNextPage && (
              <div className='movie-grid-footer ion-padding ion-text-center'>
                <Loading variant='spinner' message='Carregando mais filmes...' />
              </div>
            ),
        }}
        itemContent={(index: number) => <GridItem index={index} />}
        endReached={onLoadMore}
        // overscan={{ main: 200, reverse: 200 }}
        // increaseViewportBy={{ top: 200, bottom: 200 }}
      />

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

VirtualizedMovieGrid.displayName = 'VirtualizedMovieGrid'

export default VirtualizedMovieGrid
