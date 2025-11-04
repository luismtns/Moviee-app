import { IonCol, IonRow, IonSelect, IonSelectOption, IonText, IonToolbar } from '@ionic/react'
import React from 'react'
import './FavoritesSortFilter.css'

export type SortBy = 'created_at.asc' | 'created_at.desc'

interface FavoritesSortFilterProps {
  sortBy: SortBy
  onSortChange: (sortBy: SortBy) => void
}

const FavoritesSortFilter: React.FC<FavoritesSortFilterProps> = ({ sortBy, onSortChange }) => {
  const handleChange = (e: CustomEvent) => {
    onSortChange(e.detail.value as SortBy)
  }

  return (
    <IonToolbar className='favorites-sort-filter ion-justify-content-between'>
      <IonRow>
        <IonCol size='7' sizeMd='6'>
          <IonText>
            <h2 className='favorites-title'>Meus Favoritos</h2>
          </IonText>
        </IonCol>
        <IonCol size='5' sizeMd='6' class='ion-display-flex ion-align-items-center ion-justify-content-end'>
          <IonSelect
            value={sortBy}
            onIonChange={handleChange}
            interface='popover'
            className='sort-select'
            aria-label='Ordenar favoritos'
            label='Ordenar por'
            labelPlacement='floating'>
            <IonSelectOption value='created_at.desc'>Mais recentes</IonSelectOption>
            <IonSelectOption value='created_at.asc'>Mais antigos</IonSelectOption>
          </IonSelect>
        </IonCol>
      </IonRow>
    </IonToolbar>
  )
}

export default FavoritesSortFilter
