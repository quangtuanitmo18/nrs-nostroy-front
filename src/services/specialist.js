import { specialistApi } from '@/apis/specialists'
import { queryName } from '@/configs/query'
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'

export const useQueryGetListSpecialists = (queryParamsRef = ref({})) => {
  // Здесь мы используем useQuery с POST-запросом
  const queryResult = useQuery({
    queryKey: [queryName.listSpecialists, queryParamsRef],
    queryFn: () => specialistApi.getSpecialists(queryParamsRef.value),
    keepPreviousData: true, // Сохраняем предыдущие данные во время загрузки
    staleTime: 10000, // Данные считаются актуальными 10 секунд
  })

  return {
    dataListSpecialists: queryResult.data,
    isPendingGetSpecialists: queryResult.isPending,
    isLoadingSpecialists: queryResult.isLoading, // Только при первой загрузке
    isFetchingSpecialists: queryResult.isFetching, // При любом обновлении данных
    isSuccessGetSpecialists: queryResult.isSuccess,
    isErrorGetSpecialists: queryResult.isError,
    refetchSpecialists: queryResult.refetch,
  }
}
