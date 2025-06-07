import { QueryClient } from '@tanstack/vue-query'

export const queryName = {
  listSpecialists: ' listSpecialists',
  generateCaptcha: 'generateCaptcha',
  listRegions: 'listRegions',
}

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 0, // Не повторять мутации при ошибке
      onError: error => {
        console.error('API Error:', error)
      },
    },
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})
