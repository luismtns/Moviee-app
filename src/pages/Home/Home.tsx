import Header from '@/components/Header/Header'
import VirtualizedMovieGrid from '@/components/VirtualizedMovieGrid/VirtualizedMovieGrid'
import { usePopularMovies } from '@/hooks/useMovies'
import { IonContent, IonPage } from '@ionic/react'
import { useMemo } from 'react'
import './Home.css'

const Home: React.FC = () => {
  const { data: popularData, fetchNextPage, isPending, isFetchingNextPage } = usePopularMovies()

  const allMovies = useMemo(() => popularData?.pages.flatMap((page) => page.results) || [], [popularData])

  return (
    <IonPage>
      <Header />
      <IonContent scrollY={false}>
        <VirtualizedMovieGrid
          movies={allMovies}
          isPending={isPending}
          onLoadMore={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage || isPending}
        />
      </IonContent>
    </IonPage>
  )
}

export default Home
