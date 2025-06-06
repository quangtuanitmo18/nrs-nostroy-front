<template>
  <v-row no-gutters>
    <v-col cols="12" sm="6" class="ml-auto">
      <div class="text-caption text-left text-grey-darken-1">
        * - Считать решения о включении сведений о физических лицах, включенных в Национальный
        реестр специалистов в области строительства до вступления в силу Федерального закона от
        03.07.2016 года 372-ФЗ «О внесении изменений в Градостроительный кодекс Российской Федерации
        и отдельные законодательные акты Российской Федерации», вступившими в силу с 01 июля 2017
        года (Решение Комиссии по ведению НРС от 03.07.2017 г., №024)
      </div>
    </v-col>
  </v-row>
  <div class="my-6 position-relative">
    <!-- Показываем таблицу всегда кроме первой загрузки -->
    <template v-if="!isLoadingSpecialists || list.length > 0">
      <!-- Оверлей индикатора загрузки при фильтрации -->
      <div v-if="isFetchingSpecialists && !isLoadingSpecialists" class="filter-loading-overlay">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>

      <AnonamisTableFilter
        :columns="columns"
        :items="list"
        :pagination="pagination"
        :sort="sort"
        :search="search"
        :searchHint="searchHint"
        :countFilters="countFilters"
        :setPage="setPage"
        :setSort="setSort"
        :setFilter="setFilter"
        :setSearch="setSearch"
        @clear-all-settings="handleClearAllSettings"
      ></AnonamisTableFilter>
    </template>

    <!-- Спиннер только при первой загрузке -->
    <LoadingSpin v-else></LoadingSpin>
  </div>
</template>

<script setup>
import LoadingSpin from '@/components/loading/LoadingSpin.vue'
import {
  FILTER_TYPE_DATE_TIME,
  FILTER_TYPE_EQ,
  FILTER_TYPE_EQ_CHECK,
  FILTER_TYPE_LIKE,
  SPECIALIST_WORK_TYPE,
  SPECIALLIST_STATUS,
} from '@/constants/filter.js'
import { useGetListSpecialists } from '@/services/notification.js'
import { AnonamisTableFilter } from 'anonamis'
import { computed, ref, shallowRef, toRaw, watch } from 'vue'

const list = ref([])
const page = ref(1)
const search = ref('')
const filters = shallowRef({})
const sort = shallowRef([])

// Объект для параметров запроса
const queryParams = ref({
  page: 1,
  row_page: 10,
  filters: {},
  sort_by: {},
  search_string: '',
})

// query specialists
// Используем useQuery вместо useMutation
const { data, isPendingGetSpecialists, isLoadingSpecialists, isFetchingSpecialists } =
  useGetListSpecialists(queryParams)

const searchHint = 'Поиск по ФИО и Идентификационному номеру'

const pagination = shallowRef({})

console.log(toRaw(filters.value))

const countFilters = computed(() => Object.keys(filters.value).length)

const columns = [
  {
    heading: 'Идентификационный номер',
    value: 'registrationNumber',
    sortOptions: {
      sortable: true,
      sortByValue: 'registrationNumber',
    },
    filterOptions: {
      filterByValue: 'registrationNumber',
      filterType: FILTER_TYPE_LIKE,
    },
  },
  {
    heading: 'ФИО',
    value: 'fio',
    sortOptions: {
      sortable: true,
      sortByValue: 'fio',
    },
    filterOptions: {
      filterByValue: 'fio',
      filterType: FILTER_TYPE_LIKE,
    },
  },
  {
    heading: 'Дата принятия решения о включении сведений в реестр',
    value: 'inclusionProtocolDate',
    sortOptions: {
      sortable: true,
      sortByValue: 'inclusionProtocolDate',
    },
    filterOptions: {
      filterByValue: 'inclusionProtocolDate',
      filterType: FILTER_TYPE_DATE_TIME,
    },
  },
  {
    heading: 'Дата внесения изменений',
    value: 'updated',
    sortOptions: {
      sortable: true,
      sortByValue: 'updated',
    },
    filterOptions: {
      filterByValue: 'updated',
      filterType: FILTER_TYPE_DATE_TIME,
    },
  },
  {
    heading: 'Дата выдачи свидетельства о независимой оценке квалификации',
    value: 'inclusionCertificateDate',
    sortOptions: {
      sortable: true,
      sortByValue: 'inclusionCertificateDate',
    },
    filterOptions: {
      filterByValue: 'inclusionCertificateDate',
      filterType: FILTER_TYPE_DATE_TIME,
    },
  },
  {
    heading: 'Дата принятия решения об исключении сведений из реестра',
    value: 'suspensionProtocolDate',
    sortOptions: {
      sortable: true,
      sortByValue: 'suspensionProtocolDate',
    },
    filterOptions: {
      filterByValue: 'suspensionProtocolDate',
      filterType: FILTER_TYPE_DATE_TIME,
    },
  },
  {
    heading: 'Вид осуществляемых физическим лицом работ',
    value: 'workType',
    sortOptions: {
      sortable: true,
      sortByValue: 'workType',
    },
    filterOptions: {
      filterByValue: 'workType',
      filterType: FILTER_TYPE_EQ,
      filterValues: SPECIALIST_WORK_TYPE,
    },
  },
  {
    heading: 'Статус',
    value: 'statusTitle',
    sortOptions: {
      sortable: true,
      sortByValue: 'statusTitle',
    },
    filterOptions: {
      filterByValue: 'statusTitle',
      filterType: FILTER_TYPE_EQ_CHECK,
      filterValues: SPECIALLIST_STATUS,
    },
  },
]

const setPage = value => {
  page.value = value
}

const setSort = value => {
  sort.value = value
}

const setSearch = value => {
  search.value = value
}

const handleClearAllSettings = () => {
  page.value = 1
  filters.value = {}
  sort.value = []
  search.value = ''
}

const setFilter = dataFilters => {
  // dataFilters always is arr
  filters.value = dataFilters.reduce((acc, item) => {
    const type = typeof item.value
    if (
      (type === 'object' && item.value?.length) ||
      (type === 'string' && item.value) ||
      (type === 'number' && item.value) ||
      (type === 'boolean' && item.value === false)
    ) {
      return {
        ...acc,
        [item.filterBy]: item.value,
      }
    }

    return acc
  }, {})
}

watch([page, sort, filters, search], () => {
  queryParams.value = {
    page: page.value,
    row_page: pagination.value.size || 10,
    filters: filters.value,
    sort_by: sort.value.reduce((acc, i) => ({ ...acc, [i.sortBy]: i.sortType }), {}),
    search_string: search.value,
  }
})

// Обновляем список и пагинацию при получении новых данных
watch(
  data,
  newData => {
    if (newData && newData.data) {
      list.value = newData.data.items || []
      pagination.value = {
        count: newData.data_header?.count || 0,
        pages: newData.data_header?.count_pages || 1,
        page: newData.data_header?.page || 1,
        size: newData.data_header?.row_page || 10,
      }
    }
  },
  { immediate: true }
)
</script>
