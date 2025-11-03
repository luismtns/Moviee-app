import Header from '@/components/Header/Header'
import VirtualizedMovieGrid from '@/components/VirtualizedMovieGrid/VirtualizedMovieGrid'
import { useSearchMovies } from '@/hooks/useMovies'
import { IonContent, IonPage } from '@ionic/react'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

const Search: React.FC = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchTerm = searchParams.get('q') || ''

  const {
    data: searchData,
    fetchNextPage,
    isPending,
    isFetchingNextPage,
  } = useSearchMovies(searchTerm, searchTerm.length > 2)

  const allMovies = useMemo(() => searchData?.pages.flatMap((page) => page.results) || [], [searchData])

  return (
    <IonPage>
      <Header />
      <IonContent scrollY={false}>
        <VirtualizedMovieGrid
          movies={allMovies}
          isPending={isPending}
          onLoadMore={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage || isPending}
          highlightQuery={searchTerm}
        />
      </IonContent>
    </IonPage>
  )
}

export default Search
