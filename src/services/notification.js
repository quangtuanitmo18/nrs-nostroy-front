import { notificationApi } from '@/apis/notifications'
import { queryName } from '@/configs/query'
import { useQuery } from '@tanstack/vue-query'

export const useQueryGenerateCaptcha = () => {
  const queryResult = useQuery({
    queryKey: [queryName.generateCaptcha],
    queryFn: () => notificationApi.generateCaptcha(),
  })

  return {
    dataGenerateCaptcha: queryResult.data,
    isPendingGenerateCaptcha: queryResult.isPending,
    isLoadingGenerateCaptcha: queryResult.isLoading,
    isFetchingGenerateCaptcha: queryResult.isFetching,
    isSuccessGenerateCaptcha: queryResult.isSuccess,
    isErrorGenerateCaptcha: queryResult.isError,
    refetchGenerateCaptcha: queryResult.refetch,
  }
}
