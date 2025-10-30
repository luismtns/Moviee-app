import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1_000,
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})

export default queryClient
