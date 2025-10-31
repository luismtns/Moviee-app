import Header from '@/components/Header/Header'
import VirtualizedMovieGrid from '@/components/VirtualizedMovieGrid/VirtualizedMovieGrid'
import { usePopularMovies, useSearchMovies } from '@/hooks/useMovies'
import { useSearchStore } from '@/stores/searchStore'
import { IonContent, IonPage } from '@ionic/react'
import { useMemo } from 'react'
import './Home.css'

const Home: React.FC = () => {
  const { searchTerm } = useSearchStore()

  const {
    data: popularData,
    fetchNextPage: fetchNextPopular,
    isLoading: isLoadingPopular,
    isFetchingNextPage: isFetchingNextPagePopular,
  } = usePopularMovies()

  const {
    data: searchData,
    fetchNextPage: fetchNextSearch,
    isLoading: isLoadingSearch,
    isFetchingNextPage: isFetchingNextPageSearch,
  } = useSearchMovies(searchTerm, searchTerm.length > 2)

  const isSearching = searchTerm.length > 2
  const displayData = isSearching ? searchData : popularData
  const isLoading = isSearching ? isLoadingSearch : isLoadingPopular
  const isFetchingNextPage = isSearching ? isFetchingNextPageSearch : isFetchingNextPagePopular

  const allMovies = useMemo(() => displayData?.pages.flatMap((page) => page.results) || [], [displayData])

  const handleLoadMore = () => {
    if (isSearching) {
      fetchNextSearch()
    } else {
      fetchNextPopular()
    }
  }

  return (
    <IonPage>
      <Header />
      {/* https://ionicframework.com/docs/react/virtual-scroll */}
      <IonContent scrollY={false}>
        <VirtualizedMovieGrid
          movies={allMovies}
          onLoadMore={handleLoadMore}
          isFetchingNextPage={isFetchingNextPage || isLoading}
        />
      </IonContent>
    </IonPage>
  )
}

export default Home
