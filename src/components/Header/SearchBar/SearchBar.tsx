import { useSearchStore } from '@/stores/searchStore'
import { IonSearchbar } from '@ionic/react'
import React from 'react'
import { useDebounceCallback } from 'usehooks-ts'

interface SearchBarProps {
  placeholder?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Buscar Filmes...' }) => {
  const { searchTerm, setSearchTerm } = useSearchStore()
  const [localTerm, setLocalTerm] = React.useState(searchTerm)

  const setDebouncedTerm = useDebounceCallback((term: string) => {
    setSearchTerm(term)
  }, 300)

  const handleChange = (value: string) => {
    setLocalTerm(value)
    setDebouncedTerm(value)
  }

  const handleInput = (e: CustomEvent) => {
    const term = e.detail.value
    handleChange(term)
  }

  const handleClear = () => {
    handleChange('')
  }

  return (
    <IonSearchbar
      value={localTerm}
      placeholder={placeholder}
      onIonInput={handleInput}
      onIonClear={handleClear}
      showClearButton='focus'
      debounce={300}
      className='search-bar'
    />
  )
}
