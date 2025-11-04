import EmptyState from '@/components/EmptyState'
import FavoritesToolbar, { SortBy } from '@/components/FavoritesToolbar'
import Header from '@/components/Header/Header'
import LoginButton from '@/components/LoginButton'
import VirtualizedMovieGrid from '@/components/VirtualizedMovieGrid/VirtualizedMovieGrid'
import { useAuth } from '@/hooks'
import { useFavoriteMovies } from '@/hooks/useMovies'
import { Movie } from '@/types/Movie'
import { IonContent, IonPage } from '@ionic/react'
import { heartHalf } from 'ionicons/icons'
import React, { useMemo, useState } from 'react'
import './FavoritesPage.css'

const FavoritesPage: React.FC = () => {
  const { isAuthenticated } = useAuth()
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

  if (!isAuthenticated) {
    return (
      <IonPage>
        <Header />
        <IonContent>
          <EmptyState
            title='Login Necessário'
            message='Para adicionar filmes aos favoritos você precisa fazer login com uma conta TMDB.'
            icon={heartHalf}>
            <LoginButton />
          </EmptyState>
        </IonContent>
      </IonPage>
    )
  }

  return (
    <IonPage>
      <Header />
      <IonContent scrollY={false}>
        <FavoritesToolbar sortBy={sortBy} onSortChange={setSortBy} />
        <VirtualizedMovieGrid
          movies={allMovies}
          isLoading={isLoading}
          onLoadMore={handleLoadMore}
          isFetchingNextPage={isFetchingNextPage}
          showDeleteIcon={true}
          emptyComponent={
            <EmptyState
              icon={heartHalf}
              message='Nenhum filme favorito encontrado'
              actionHref='/'
              actionLabel='Explorar filmes'
            />
          }
        />
      </IonContent>
    </IonPage>
  )
}

export default FavoritesPage
