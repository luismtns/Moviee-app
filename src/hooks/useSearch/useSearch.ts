import { useSearchStore } from '@/stores/searchStore'
import { useIonRouter } from '@ionic/react'
import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

export const useSearch = () => {
  const location = useLocation()
  const history = useHistory()
  const router = useIonRouter()
  const { searchQuery, setSearchQuery } = useSearchStore()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const urlQuery = params.get('q') || ''

    if (urlQuery !== searchQuery) {
      setSearchQuery(urlQuery)
    }
  }, [location.search, setSearchQuery, searchQuery])

  const updateSearch = (query: string) => {
    setSearchQuery(query)

    if (query) {
      history.push(`/search?q=${encodeURIComponent(query)}`)
    } else {
      history.push('/')
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    history.push('/')
  }

  const navigateToSearch = () => {
    if (!searchQuery) {
      history.push('/search')
    }
  }

  return {
    searchQuery,
    updateSearch,
    clearSearch,
    navigateToSearch,
    canGoBack: router.canGoBack(),
  }
}
