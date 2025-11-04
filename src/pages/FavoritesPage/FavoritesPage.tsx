import FavoritesSortFilter, { SortBy } from '@/components/FavoritesSortFilter'
import Header from '@/components/Header/Header'
import VirtualizedMovieGrid from '@/components/VirtualizedMovieGrid/VirtualizedMovieGrid'
import { useFavoriteMovies } from '@/hooks/useMovies'
import { Movie } from '@/types/Movie'
import { IonContent, IonPage } from '@ionic/react'
import React, { useMemo, useState } from 'react'
import './FavoritesPage.css'

const FavoritesPage: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortBy>('created_at.desc')
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFavoriteMovies(sortBy)

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
        <FavoritesSortFilter sortBy={sortBy} onSortChange={setSortBy} />
        <VirtualizedMovieGrid
          movies={allMovies}
          isLoading={isLoading}
          onLoadMore={handleLoadMore}
          isFetchingNextPage={isFetchingNextPage}
          showDeleteIcon={true}
        />
      </IonContent>
    </IonPage>
  )
}

export default FavoritesPage
