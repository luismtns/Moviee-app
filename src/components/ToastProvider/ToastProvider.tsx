import { useToastStore } from '@/utils/notifications'
import { IonToast } from '@ionic/react'
import { memo } from 'react'

const getToastColor = (type: string) => {
  const colorMap = {
    success: 'success',
    error: 'danger',
    warning: 'warning',
    info: 'primary',
  }
  return colorMap[type as keyof typeof colorMap] || 'primary'
}

const ToastProvider: React.FC = memo(() => {
  const { toasts, removeToast } = useToastStore()

  return (
    <>
      {toasts.map((toast) => (
        <IonToast
          key={toast.id}
          isOpen={true}
          message={toast.message}
          duration={toast.duration}
          position='bottom'
          color={getToastColor(toast.type)}
          onDidDismiss={() => removeToast(toast.id)}
        />
      ))}
    </>
  )
})

ToastProvider.displayName = 'ToastProvider'

export default ToastProvider
