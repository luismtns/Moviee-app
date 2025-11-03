import Header from '@/components/Header/Header'
import { useMovieDetails } from '@/hooks/useMovies'
import { IonCol, IonContent, IonGrid, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'
import MovieBackdrop from './MovieBackdrop'
import './MovieDetails.css'
import MovieDetailsList from './MovieDetailsList'
import MovieHeader from './MovieHeader'
import MovieMeta from './MovieMeta'
import MoviePoster from './MoviePoster'
import MovieSynopsis from './MovieSynopsis'

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const movieId = parseInt(id, 10)

  const { data: movie, isLoading, error, isPending } = useMovieDetails(movieId)

  if (isLoading || isPending) {
    return (
      <IonContent className='ion-padding ion-text-center'>
        <IonSpinner name='crescent' />
        <IonText>
          <h2>Carregando detalhes do filme...</h2>
        </IonText>
      </IonContent>
    )
  }

  if (error || !movie) {
    return (
      <IonContent className='ion-padding ion-text-center'>
        <IonText>
          <h2>Filme não encontrado</h2>
        </IonText>
      </IonContent>
    )
  }

  return (
    <IonPage>
      <Header backHref='/' />
      <IonContent>
        <MovieBackdrop backdropPath={movie.backdrop_path} />

        <div className='movie-content'>
          <IonGrid>
            <IonRow>
              <IonCol size='8' sizeMd='3' offset='2' offsetMd='1'>
                <MoviePoster posterPath={movie.poster_path} title={movie.title} />
              </IonCol>

              <IonCol size='12' sizeMd='8'>
                <div className='movie-info-card'>
                  <MovieHeader title={movie.title} genres={movie.genres} />

                  <IonRow>
                    <MovieMeta
                      releaseDate={movie.release_date}
                      voteAverage={movie.vote_average}
                      runtime={movie.runtime}
                    />
                    <FavoriteButton movieId={movie.id} />
                  </IonRow>

                  <MovieSynopsis overview={movie.overview} />

                  <MovieDetailsList
                    releaseDate={movie.release_date}
                    voteAverage={movie.vote_average}
                    voteCount={movie.vote_count}
                    budget={movie.budget}
                    revenue={movie.revenue}
                  />
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default MovieDetails
