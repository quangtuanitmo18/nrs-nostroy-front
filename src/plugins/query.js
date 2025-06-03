import { VueQueryPlugin } from '@tanstack/vue-query'

export const queryOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1 * 60 * 1000, // 1 minutes
    },
  },
}

export { VueQueryPlugin }
