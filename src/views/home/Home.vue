<template>
  <div class="position-relative header-container">
    <v-row>
      <v-col cols="12" sm="6" class="ml-auto mt-4">
        <div class="header-text-caption d-none d-md-block">
          * - Считать решения о включении сведений о физических лицах, включенных в Национальный
          реестр специалистов в области строительства до вступления в силу Федерального закона от
          03.07.2016 года 372-ФЗ «О внесении изменений в Градостроительный кодекс Российской
          Федерации и отдельные законодательные акты Российской Федерации», вступившими в силу с 01
          июля 2017 года (Решение Комиссии по ведению НРС от 03.07.2017 г., №024)
        </div>
      </v-col>
    </v-row>
    <!-- <div v-if="isLoadingSpecialists" class="mt-8">
      <LoadingSpin />
    </div> -->

    <keep-alive>
      <div class="my-6 position-relative table-container">
        <!-- Table view (hidden on md and down) -->
        <div class="d-none d-lg-block">
          <HomeViewDesktop
            :list="list"
            :pagination="pagination"
            :sort="sort"
            :search="search"
            :searchHint="searchHint"
            :countFilters="countFilters"
            :setPage="setPage"
            :setSort="setSort"
            :setFilter="setFilter"
            :setSearch="setSearch"
            :isLoading="isLoadingSpecialists"
            @clear-all-settings="handleClearAllSettings"
          ></HomeViewDesktop>
        </div>
      </div>
    </keep-alive>

    <!-- Mobile view -->
    <keep-alive>
      <div class="d-lg-none my-6 position-relative">
        <!-- Card view (shown only on md and down) -->
        <HomeViewMobile
          :list="list"
          :pagination="pagination"
          :sort="sort"
          :search="search"
          :searchHint="searchHint"
          :countFilters="countFilters"
          :setPage="setPage"
          :setSort="setSort"
          :setFilter="setFilter"
          :setSearch="setSearch"
          :isLoading="isLoadingSpecialists"
          @clear-all-settings="handleClearAllSettings"
        ></HomeViewMobile>
      </div>
    </keep-alive>
  </div>
</template>

<script setup>
import appConfig from '@/configs/app'
import { useQueryGetListSpecialists } from '@/services/specialist.js'
import { computed, KeepAlive, ref, shallowRef, watch } from 'vue'
import HomeViewDesktop from './components/HomeViewDesktop.vue'
import HomeViewMobile from './components/HomeViewMobile.vue'

const list = ref([])
const page = ref(1)
const search = ref('')
const filters = shallowRef({})
const sort = shallowRef([])
const size = ref(appConfig.rowPageTable) // Количество элементов на странице

// Объект для параметров запроса
const queryParams = ref({
  page: 1,
  row_page: size.value,
  filters: {},
  sort_by: {},
  search_string: '',
})

// query specialists
const {
  dataListSpecialists,
  isPendingGetSpecialists,
  isLoadingSpecialists,
  isFetchingSpecialists,
} = useQueryGetListSpecialists(queryParams)

// const searchHint = 'Поиск по ФИО и Идентификационному номеру'

const pagination = shallowRef({})

const countFilters = computed(() => Object.keys(filters.value).length)

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

watch([page, sort, filters, search, size], () => {
  queryParams.value = {
    page: page.value,
    row_page: size.value || 10,
    filters: filters.value,
    sort_by: sort.value.reduce((acc, i) => ({ ...acc, [i.sortBy]: i.sortType }), {}),
    search_string: search.value,
  }
})

// Обновляем список и пагинацию при получении новых данных
watch(
  dataListSpecialists,
  newDataListSpecialists => {
    if (newDataListSpecialists && newDataListSpecialists.data) {
      list.value = newDataListSpecialists.data.items || []
      pagination.value = {
        count: newDataListSpecialists.data.data_header?.count || 0,
        pages: newDataListSpecialists.data.data_header?.count_pages || 1,
        page: newDataListSpecialists.data.data_header?.page || 1,
        size: newDataListSpecialists.data.data_header?.row_page || 10,
      }
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.specialist-card {
  transition: all 0.3s ease;
}
.header-container {
  background-color: var(--color-white);
}

.header-text-caption {
  font-size: 12px;
  color: var(--text-main);
  background-color: var(--color-white);
}

.specialist-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
}

.specialist-work-type {
  display: flex;
  margin-bottom: 8px;
  font-size: 0.875rem;
}
</style>
