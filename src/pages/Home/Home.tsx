import { Header } from '@/components/Header/Header'
import VirtualizedMovieGrid from '@/components/VirtualizedMovieList/VirtualizedMovieGrid'
import { usePopularMovies, useSearchMovies } from '@/hooks/useMovies'
import { useSearchStore } from '@/stores/searchStore'
import { IonContent, IonPage } from '@ionic/react'
import { useMemo } from 'react'
import './Home.css'

const Home: React.FC = () => {
  const { searchTerm } = useSearchStore()

  // Hook para filmes populares
  const {
    data: popularData,
    fetchNextPage: fetchNextPopular,
    isLoading: isLoadingPopular,
    isFetchingNextPage: isFetchingNextPagePopular,
  } = usePopularMovies()

  // Hook para busca (apenas quando há termo de busca)
  const {
    data: searchData,
    fetchNextPage: fetchNextSearch,
    isLoading: isLoadingSearch,
    isFetchingNextPage: isFetchingNextPageSearch,
  } = useSearchMovies(searchTerm, searchTerm.length > 2)

  // Determinar qual dados usar
  const isSearching = searchTerm.length > 2
  const displayData = isSearching ? searchData : popularData
  const isLoading = isSearching ? isLoadingSearch : isLoadingPopular
  const isFetchingNextPage = isSearching ? isFetchingNextPageSearch : isFetchingNextPagePopular

  // Memoize expensive calculation
  const allMovies = useMemo(() => displayData?.pages.flatMap((page) => page.results) || [], [displayData])

  const handleLoadMore = () => {
    if (isSearching) {
      fetchNextSearch()
    } else {
      fetchNextPopular()
    }
  }

  const handleSearch = (term: string) => {
    // A busca é gerenciada automaticamente pelo SearchBar + useSearchStore
    console.log('Searching for:', term)
  }

  return (
    <IonPage>
      <Header onSearch={handleSearch} showSearch={true} />
      <IonContent fullscreen>
        <VirtualizedMovieGrid
          movies={allMovies}
          onLoadMore={handleLoadMore}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
        />
      </IonContent>
    </IonPage>
  )
}

export default Home
