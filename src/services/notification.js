import { specialistApi } from '@/apis/specialists'
// import { queryName } from '@/configs/query'
import { useMutation } from '@tanstack/vue-query'

export const useGetListSpecialists = () => {
  const { data, isPending, isSuccess, isError, mutateAsync, mutate } = useMutation({
    // mutationKey: [queryName.listSpecialists],
    mutationFn: (params = {}) => specialistApi.getSpecialists(params),
  })

  return {
    data,
    isPendingGetSpecialists: isPending,
    isSuccessGetSpecialists: isSuccess,
    isErrorGetSpecialists: isError,
    mutateAsyncGetSpecialists: mutateAsync,
    mutateGetSpecialists: mutate,
  }
}
