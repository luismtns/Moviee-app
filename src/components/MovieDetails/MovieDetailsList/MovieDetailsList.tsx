import { MovieDetails } from '@/types/Movie'
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react'
import { ReactNode, memo } from 'react'
import './MovieDetailsList.css'

export interface Field {
  key: string
  icon: string
  label: string
  render?: (data: MovieDetails) => ReactNode
}

interface MovieDetailsListProps {
  data: MovieDetails
  fields: Field[]
}

const getNestedValue = (obj: MovieDetails, path: string): unknown => {
  return path.split('.').reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part]
    }
    return undefined
  }, obj)
}

const MovieDetailsList = memo(({ data, fields }: MovieDetailsListProps) => {
  return (
    <IonList className='movie-meta-list'>
      {fields.map((field) => {
        const value = getNestedValue(data, field.key)
        const content = field.render ? field.render(data) : value?.toString() || 'N/A'

        return (
          <IonItem key={field.key}>
            <IonIcon slot='start' icon={field.icon} />
            <IonLabel>
              <h2>{field.label}</h2>
              {typeof content === 'string' ? <p dangerouslySetInnerHTML={{ __html: content }} /> : <div>{content}</div>}
            </IonLabel>
          </IonItem>
        )
      })}
    </IonList>
  )
})

export default MovieDetailsList
