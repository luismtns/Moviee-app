import { IonButtons, IonText, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import './FavoritesToolbar.css'
import SortFilter, { SortBy } from './SortFilter'

interface FavoritesToolbarProps {
  sortBy: SortBy
  onSortChange: (sortBy: SortBy) => void
}

const FavoritesToolbar: React.FC<FavoritesToolbarProps> = ({ sortBy, onSortChange }) => {
  return (
    <IonToolbar className='favorites-toolbar ion-justify-content-between'>
      <IonTitle>
        <IonText>
          <h2 className='favorites-title'>Meus Favoritos</h2>
        </IonText>
      </IonTitle>
      <IonButtons slot='end'>
        <SortFilter sortBy={sortBy} onSortChange={onSortChange} />
      </IonButtons>
    </IonToolbar>
  )
}

export default FavoritesToolbar
