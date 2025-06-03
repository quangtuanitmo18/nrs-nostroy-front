import { QueryClient } from '@tanstack/vue-query'

export const queryName = {
  testApi: 'testApi',
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})
