import { IonCol, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import { useSearchStore } from '../../stores/searchStore'
import Logo from '../Logo/Logo'
import './Header.css'
import { Navigation } from './Navigation/Navigation'
import { SearchBar } from './SearchBar/SearchBar'

interface HeaderProps {
  onSearch?: (term: string) => void
  showSearch?: boolean
}

export const Header: React.FC<HeaderProps> = ({ onSearch, showSearch = true }) => {
  const { searchTerm, clearSearch } = useSearchStore()
  const [isSearchExpanded, setIsSearchExpanded] = React.useState(false)

  const handleSearchToggle = () => {
    if (isSearchExpanded && searchTerm) {
      clearSearch()
    }
    setIsSearchExpanded(!isSearchExpanded)
  }

  const handleSearch = (term: string) => {
    onSearch?.(term)
  }

  return (
    <IonHeader color='dark' className='main-header'>
      <IonToolbar>
        <IonGrid>
          <IonRow className='ion-align-items-center ion-justify-content-between'>
            <IonCol size='auto'>
              <div className='logo-container'>
                <Logo />
                <IonTitle className='header-title'>
                  <span className='app-name'>Moviee</span>
                </IonTitle>
              </div>
            </IonCol>

            <IonCol sizeLg='4'>{showSearch && <SearchBar onSearch={handleSearch} />}</IonCol>

            <IonCol size='auto' className='ion-justify-self-end'>
              <Navigation />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonHeader>
  )
}
