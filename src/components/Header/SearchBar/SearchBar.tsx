import { useDebounce } from '@/hooks/useDebounce'
import { useSearchStore } from '@/stores/searchStore'
import { IonSearchbar } from '@ionic/react'
import React from 'react'

interface SearchBarProps {
  onSearch?: (term: string) => void
  placeholder?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = 'Buscar Filmes...' }) => {
  const { searchTerm, setSearchTerm } = useSearchStore()
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  React.useEffect(() => {
    if (debouncedSearchTerm) {
      onSearch?.(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm, onSearch])

  const handleInput = (e: CustomEvent) => {
    const term = e.detail.value
    setSearchTerm(term)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  return (
    <IonSearchbar
      value={searchTerm}
      placeholder={placeholder}
      onIonInput={handleInput}
      onIonClear={handleClear}
      showClearButton='focus'
      debounce={300}
      className='search-bar'
    />
  )
}
