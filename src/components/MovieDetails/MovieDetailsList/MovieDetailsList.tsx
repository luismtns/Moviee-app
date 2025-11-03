import dayjs from '@/lib/dayjs'
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react'
import { calendar, cash, star, wallet } from 'ionicons/icons'
import { memo } from 'react'
import './MovieDetailsList.css'

interface MovieDetailsListProps {
  releaseDate: string
  voteAverage: number
  voteCount: number
  budget?: number
  revenue?: number
}

const MovieDetailsList: React.FC<MovieDetailsListProps> = memo(
  ({ releaseDate, voteAverage, voteCount, budget, revenue }) => {
    const formattedReleaseDate = dayjs(releaseDate).format('LL')
    const rating = voteAverage.toFixed(1)
    const formattedVoteCount = voteCount.toLocaleString()

    const formatCurrency = (amount: number | undefined) => {
      if (!amount || amount === 0) return 'N/A'
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
    }

    const budgetFormatted = formatCurrency(budget)
    const revenueFormatted = formatCurrency(revenue)

    return (
      <IonList className='movie-meta-list'>
        <IonItem>
          <IonIcon slot='start' icon={calendar} />
          <IonLabel>
            <h2>Data de Lançamento</h2>
            <p>{formattedReleaseDate}</p>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonIcon slot='start' icon={star} />
          <IonLabel>
            <h2>Nota do TMDB</h2>
            <p>
              Nota <strong>{rating}</strong> de 10 com <strong>{formattedVoteCount}</strong> votos
            </p>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonIcon slot='start' icon={cash} />
          <IonLabel>
            <h2>Orçamento</h2>
            <p>
              <strong>{budgetFormatted}</strong>
            </p>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonIcon slot='start' icon={wallet} />
          <IonLabel>
            <h2>Receita</h2>
            <p>
              <strong>{revenueFormatted}</strong>
            </p>
          </IonLabel>
        </IonItem>
      </IonList>
    )
  }
)

export default MovieDetailsList
