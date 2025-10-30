import { IonCard, IonSkeletonText, IonSpinner } from '@ionic/react'
import { memo } from 'react'

interface LoadingProps {
  variant?: 'spinner' | 'skeleton' | 'card-skeleton'
  message?: string
  count?: number
}

const Loading: React.FC<LoadingProps> = memo(({ variant = 'spinner', message = 'Carregando...', count = 3 }) => {
  if (variant === 'spinner') {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}>
        <IonSpinner name='crescent' />
        <p style={{ margin: 0, opacity: 0.7 }}>{message}</p>
      </div>
    )
  }

  if (variant === 'skeleton') {
    return (
      <div style={{ padding: '16px' }}>
        {Array.from({ length: count }, (_, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            <IonSkeletonText animated style={{ width: '60%', height: '20px' }} />
            <IonSkeletonText animated style={{ width: '80%', height: '16px', marginTop: '8px' }} />
            <IonSkeletonText animated style={{ width: '40%', height: '16px', marginTop: '4px' }} />
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'card-skeleton') {
    return (
      <div style={{ padding: '16px' }}>
        {Array.from({ length: count }, (_, index) => (
          <IonCard key={index}>
            <div style={{ display: 'flex', padding: '16px' }}>
              {/* Poster skeleton */}
              <IonSkeletonText
                animated
                style={{
                  width: '120px',
                  height: '180px',
                  borderRadius: '8px',
                  marginRight: '16px',
                }}
              />

              {/* Content skeleton */}
              <div style={{ flex: 1 }}>
                <IonSkeletonText animated style={{ width: '70%', height: '24px' }} />
                <IonSkeletonText animated style={{ width: '50%', height: '16px', marginTop: '8px' }} />
                <IonSkeletonText animated style={{ width: '100%', height: '14px', marginTop: '12px' }} />
                <IonSkeletonText animated style={{ width: '100%', height: '14px', marginTop: '4px' }} />
                <IonSkeletonText animated style={{ width: '80%', height: '14px', marginTop: '4px' }} />
                <IonSkeletonText animated style={{ width: '30%', height: '36px', marginTop: '16px' }} />
              </div>
            </div>
          </IonCard>
        ))}
      </div>
    )
  }

  return null
})

Loading.displayName = 'Loading'

export default Loading
