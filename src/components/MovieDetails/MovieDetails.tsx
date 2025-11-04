import Header from '@/components/Header/Header'
import { useMovieDetails } from '@/hooks/useMovies'
import dayjs from '@/lib/dayjs'
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react'
import { arrowUpRightBoxOutline, calendar, cash, film, star, wallet } from 'ionicons/icons'
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
                    data={movie}
                    fields={[
                      {
                        key: 'release_date',
                        icon: calendar,
                        label: 'Data de Lançamento',
                        render: (data) => dayjs(data.release_date).format('LL'),
                      },
                      {
                        key: 'vote_average',
                        icon: star,
                        label: 'Nota do TMDB',
                        render: (data) =>
                          `Nota <strong>${data.vote_average.toFixed(
                            1
                          )}</strong> de 10 com <strong>${data.vote_count.toLocaleString()}</strong> votos`,
                      },
                      {
                        key: 'homepage',
                        icon: film,
                        label: 'Assistir Online',
                        render: (data) => (
                          <IonButton
                            disabled={!data.homepage}
                            color={'tertiary'}
                            onClick={() => window.open(data.homepage || '', '_system', 'location=yes')}>
                            {data.homepage ? 'Visitar Site' : 'Indisponível'}
                            <IonIcon slot='end' icon={arrowUpRightBoxOutline} />
                          </IonButton>
                        ),
                      },
                      {
                        key: 'budget',
                        icon: cash,
                        label: 'Orçamento',
                        render: (data) => {
                          const formatted = data.budget
                            ? new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                              }).format(data.budget)
                            : 'N/A'
                          return `<strong>${formatted}</strong>`
                        },
                      },
                      {
                        key: 'revenue',
                        icon: wallet,
                        label: 'Receita',
                        render: (data) => {
                          const formatted = data.revenue
                            ? new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                              }).format(data.revenue)
                            : 'N/A'
                          return `<strong>${formatted}</strong>`
                        },
                      },
                    ]}
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
