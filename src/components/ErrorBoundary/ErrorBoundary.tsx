import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonText } from '@ionic/react'
import { refreshOutline, warningOutline } from 'ionicons/icons'
import { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  showRetry?: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo })

    // Log error (in production, send to error tracking service)
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <IonCard color='danger'>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={warningOutline} style={{ marginRight: '8px' }} />
              Ops! Algo deu errado
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              <h3>Ocorreu um erro inesperado. </h3>
            </IonText>

            {this.props.showRetry && (
              <IonButton fill='solid' color='light' onClick={this.handleRetry} style={{ marginTop: '16px' }}>
                <IonIcon icon={refreshOutline} slot='start' />
                Tentar novamente
              </IonButton>
            )}
          </IonCardContent>
        </IonCard>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
