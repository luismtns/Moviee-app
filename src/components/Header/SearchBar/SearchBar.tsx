import { useSearch } from '@/hooks/useSearch'
import { IonSearchbar, IonToolbar, useIonViewDidEnter } from '@ionic/react'
import { useRef } from 'react'
import './SearchBar.css'

interface SearchBarProps {
  placeholder?: string
  autoFocus?: boolean
  slot?: string | undefined
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Buscar Filmes...' }) => {
  const { searchQuery, updateSearch, clearSearch, navigateToSearch } = useSearch()
  const inputRef = useRef<HTMLIonSearchbarElement>(null)

  const handleInput = (e: CustomEvent) => {
    const term = e.detail.value || ''
    updateSearch(term)
  }

  const handleFocus = () => {
    navigateToSearch()
  }

  const handleClear = () => {
    clearSearch()
  }

  useIonViewDidEnter(() => {
    if (location.pathname === '/search') {
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
        onIonFocus={handleFocus}
        showClearButton='always'
        debounce={800}
        className='search-bar'
      />
    </IonToolbar>
  )
}
