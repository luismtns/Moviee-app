import { useSearch } from '@/hooks/useSearch'
import { IonSearchbar, IonToolbar, useIonViewDidEnter } from '@ionic/react'
import { useRef } from 'react'
import { useRouteMatch } from 'react-router'
import './SearchBar.css'

interface SearchBarProps {
  placeholder?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Buscar Filmes...' }) => {
  const isSearchRoute = useRouteMatch('/search')
  const { searchQuery, updateSearch, clearSearch } = useSearch()
  const inputRef = useRef<HTMLIonSearchbarElement>(null)

  const handleInput = (e: CustomEvent) => {
    const term = e.detail.value || ''
    updateSearch(term)
  }

  const handleClear = () => {
    clearSearch()
  }

  useIonViewDidEnter(() => {
    if (isSearchRoute) {
      inputRef.current?.setFocus()
    }
  })

  return (
    <IonToolbar className='search-container'>
      <IonSearchbar
        ref={inputRef}
        value={searchQuery}
        placeholder={placeholder}
        onIonChange={handleInput}
        onIonClear={handleClear}
        showClearButton='always'
        debounce={800}
        className='search-bar'
      />
    </IonToolbar>
  )
}
