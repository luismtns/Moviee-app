import Header from '@/components/Header/Header'
import VirtualizedMovieGrid from '@/components/VirtualizedMovieGrid/VirtualizedMovieGrid'
import { useFavoriteMovies } from '@/hooks/useMovies'
import { Movie } from '@/types/Movie'
import { IonContent, IonPage } from '@ionic/react'
import React, { useMemo } from 'react'
import './FavoritesPage.css'

const FavoritesPage: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFavoriteMovies()

  const allMovies = useMemo(() => {
    if (!data?.pages) return []

    return data.pages.flatMap((page) =>
      page.results.map(
        (movie) =>
          ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
          } as Movie)
      )
    )
  }, [data])

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return (
    <IonPage>
      <Header />
      <IonContent scrollY={false}>
        <VirtualizedMovieGrid movies={allMovies} onLoadMore={handleLoadMore} isFetchingNextPage={isFetchingNextPage} />
      </IonContent>
    </IonPage>
  )
}

export default FavoritesPage
