import Header from '@/components/Header/Header'
import VirtualizedMovieGrid from '@/components/VirtualizedMovieGrid/VirtualizedMovieGrid'
import { useFavorites } from '@/hooks/useFavorites'
import { useFavoriteMovies } from '@/hooks/useMovies'
import { Movie } from '@/types/Movie'
import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import './FavoritesPage.css'

const FavoritesPage: React.FC = () => {
  const { favoriteIds } = useFavorites()
  const { data: detailedMovies } = useFavoriteMovies(favoriteIds)

  const allMovies = detailedMovies?.map((movie) => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  }))
  return (
    <IonPage>
      <Header />
      <IonContent scrollY={false}>
        <VirtualizedMovieGrid movies={allMovies?.map((movie) => movie as Movie) || []} />
      </IonContent>
    </IonPage>
  )
}

export default FavoritesPage
