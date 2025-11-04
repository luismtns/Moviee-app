import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react'
import { ReactNode, memo } from 'react'
import './MovieDetailsList.css'

export interface Field<T = any> {
  key: string
  icon: string
  label: string
  render?: (data: T) => ReactNode
}

interface MovieDetailsListProps<T = any> {
  data: T
  fields: Field<T>[]
}

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => acc?.[part], obj)
}

const MovieDetailsList = memo(<T,>({ data, fields }: MovieDetailsListProps<T>) => {
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
}) as <T>(props: MovieDetailsListProps<T>) => React.JSX.Element

export default MovieDetailsList
