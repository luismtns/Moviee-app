import type { Movie } from '@/types/Movie'
import { IonCol, IonRow, IonSpinner, IonText } from '@ionic/react'
import clsx from 'clsx'
import React, { forwardRef, useMemo, useState } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'
import MovieCard from '../MovieCard/MovieCard'
import './VirtualizedMovieGrid.css'

interface VirtualizedMovieGridProps {
  movies: Movie[]
  isPending?: boolean
  onLoadMore?: () => void
  customScrollParent?: HTMLElement
  isFetchingNextPage?: boolean
  highlightQuery?: string
}

const VirtualizedMovieGrid: React.FC<VirtualizedMovieGridProps> = ({
  movies,
  isPending,
  onLoadMore,
  customScrollParent,
  isFetchingNextPage,
  highlightQuery,
}) => {
  const [isScrolling, setIsScrolling] = useState(false)

  const List = useMemo(
    () =>
      forwardRef<HTMLDivElement, React.ComponentProps<typeof IonRow>>(function List(
        { children, className, ...rest },
        ref
      ) {
        return (
          <IonRow ref={ref as React.Ref<HTMLIonRowElement>} className={className} {...rest}>
            {children}
          </IonRow>
        )
      }),
    []
  )

  const Item = useMemo(
    () =>
      forwardRef<HTMLDivElement, React.ComponentProps<typeof IonCol>>(function Item(
        { children, className, ...rest },
        ref
      ) {
        return (
          <IonCol
            ref={ref as React.Ref<HTMLIonColElement>}
            className={clsx(className, 'movie-grid-col')}
            size='12'
            sizeSm='6'
            sizeMd='4'
            sizeLg='3'
            sizeXl='2'
            {...rest}>
            {children}
          </IonCol>
        )
      }),
    []
  )

  const Footer = () => {
    return (
      isFetchingNextPage && (
        <div className='ion-padding ion-text-center' style={{ width: '100%' }}>
          <IonSpinner name='crescent' />
        </div>
      )
    )
  }
  if (isPending) {
    return (
      <div className='ion-text-center ion-padding'>
        <IonSpinner name='crescent' slot='start' />
        <IonText>
          <h2>Carregando lista de filmes...</h2>
        </IonText>
      </div>
    )
  }

  if (movies.length === 0 && !isPending) {
    return (
      <div className='ion-text-center ion-padding'>
        <p>Nenhum filme encontrado</p>
      </div>
    )
  }

  return (
    <VirtuosoGrid
      className='virtuoso-grid ion-content-scroll-host'
      totalCount={movies.length}
      data={movies}
      customScrollParent={customScrollParent}
      context={{ isScrolling }}
      isScrolling={setIsScrolling}
      itemContent={(index, movie, { isScrolling }) => (
        <MovieCard key={`movie-card-${index}`} movie={movie} highlightQuery={highlightQuery} />
      )}
      components={{ List, Item, Footer }}
      endReached={onLoadMore}
      listClassName='ion-padding'
      overscan={200}
    />
  )
}

export default VirtualizedMovieGrid
