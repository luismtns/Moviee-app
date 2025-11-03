import { useAuthStore } from '@/stores/authStore'
import { useEffect, useState } from 'react'

const useAuthHydration = () => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => setHydrated(true))

    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true)
    }

    return () => unsub()
  }, [])

  return hydrated
}
export default useAuthHydration
