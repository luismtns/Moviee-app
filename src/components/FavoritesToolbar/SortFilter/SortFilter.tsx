import { IonSelect, IonSelectOption } from '@ionic/react'
import React from 'react'
import './SortFilter.css'

export type SortBy = 'created_at.asc' | 'created_at.desc'

interface SortFilterProps {
  sortBy: SortBy
  onSortChange: (sortBy: SortBy) => void
}

const SortFilter: React.FC<SortFilterProps> = ({ sortBy, onSortChange }) => {
  const handleChange = (e: CustomEvent) => {
    onSortChange(e.detail.value as SortBy)
  }

  return (
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
  )
}

export default SortFilter
