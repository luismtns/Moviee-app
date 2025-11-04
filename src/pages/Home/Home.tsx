import Header from '@/components/Header/Header'
import VirtualizedMovieGrid from '@/components/VirtualizedMovieGrid/VirtualizedMovieGrid'
import { usePopularMovies } from '@/hooks/useMovies'
import { IonContent, IonPage } from '@ionic/react'
import { useMemo } from 'react'
import './Home.css'

const Home: React.FC = () => {
  const { data: popularData, fetchNextPage, isLoading, isFetchingNextPage } = usePopularMovies()

  const allMovies = useMemo(() => popularData?.pages.flatMap((page) => page.results) || [], [popularData])

  return (
    <IonPage>
      <Header />
      <IonContent scrollY={false}>
        <VirtualizedMovieGrid
          movies={allMovies}
          isLoading={isLoading}
          onLoadMore={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage || isLoading}
        />
      </IonContent>
    </IonPage>
  )
}

export default Home
