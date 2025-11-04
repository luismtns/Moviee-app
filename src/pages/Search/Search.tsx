import EmptyState from '@/components/EmptyState/EmptyState'
import Header from '@/components/Header/Header'
import VirtualizedMovieGrid from '@/components/VirtualizedMovieGrid/VirtualizedMovieGrid'
import { useSearchMovies } from '@/hooks/useMovies'
import { useSearch } from '@/hooks/useSearch'
import { IonContent, IonPage } from '@ionic/react'
import { sad, search } from 'ionicons/icons'
import { useMemo } from 'react'
import { useHistory } from 'react-router-dom'

const Search: React.FC = () => {
  const history = useHistory()
  const { searchQuery, clearSearch } = useSearch()

  const {
    data: searchData,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useSearchMovies(searchQuery, searchQuery.length > 2)

  const allMovies = useMemo(() => searchData?.pages.flatMap((page) => page.results) || [], [searchData])

  const handleAction = () => {
    if (noResults) {
      history.push('/home')
    } else {
      clearSearch()
    }
  }

  const noResults = !isLoading && allMovies.length === 0 && searchQuery.length > 2
  return (
    <IonPage>
      <Header />
      <IonContent scrollY={false}>
        <VirtualizedMovieGrid
          movies={allMovies}
          isLoading={isLoading}
          onLoadMore={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage || isLoading}
          highlightQuery={searchQuery}
          emptyComponent={
            <EmptyState
              icon={!noResults ? search : sad}
              message={
                noResults
                  ? 'Nenhum resultado encontrado para sua busca.'
                  : 'Utilize o campo de busca acima para encontrar filmes.'
              }
              onAction={handleAction}
              actionLabel={noResults ? 'Explorar filmes' : 'Limpar busca'}
            />
          }
        />
      </IonContent>
    </IonPage>
  )
}

export default Search
