import { IonSearchbar, useIonViewDidEnter } from '@ionic/react'
import React, { useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

interface SearchBarProps {
  placeholder?: string
  autoFocus?: boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Buscar Filmes...' }) => {
  const history = useHistory()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const queryTerm = searchParams.get('q') || ''

  const inputRef = useRef<HTMLIonSearchbarElement>(null)

  const handleInput = (e: CustomEvent) => {
    const term = e.detail.value || ''
    if (term) {
      history.push(`/search?q=${encodeURIComponent(term)}`)
    } else {
      history.push('/')
    }
  }

  const handleClear = () => {
    history.push('/')
  }

  useIonViewDidEnter(() => {
    if (location.search.includes('q=')) {
      inputRef.current?.setFocus()
    }
  })
  return (
    <IonSearchbar
      ref={inputRef}
      value={queryTerm}
      placeholder={placeholder}
      onIonInput={handleInput}
      onIonClear={handleClear}
      showClearButton='always'
      debounce={800}
      className='search-bar'
    />
  )
}
