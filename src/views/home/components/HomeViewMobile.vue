<template>
  <div class="d-flex flex-column ga-2">
    <!-- Search and filter controls -->
    <div
      class="d-flex align-end justify-md-space-between align-md-center mb-4 flex-column flex-md-row ga-2"
    >
      <div class="table-search">
        <v-text-field
          clearable
          @click:clear="setSearch('')"
          @keydown.enter="handleSearch"
          variant="underlined"
          label="Поиск по ФИО и Идентификационному номеру"
          v-model="innerSearch"
          class="input-search"
        />
        <v-icon
          @click="handleSearch"
          :class="{ active: innerSearch }"
          class="table-search-icon"
          icon="mdi-magnify"
        ></v-icon>
      </div>

      <div class="pull-right mr-2 d-flex ga-3">
        <BtnPrimary @click="clearAllSettings" title="Очистить все настройки" class="clear-btn"
          >Очистить</BtnPrimary
        >
        <v-menu v-model="showSortMenu" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <BtnPrimary
              v-bind="props"
              class="mb-2 filter-icon sort-btn"
              :class="{ 'filter-badge': !!currentSort.length }"
              :data-count="currentSort.length.toString()"
            >
              <v-icon icon="mdi-sort"></v-icon>
            </BtnPrimary>
          </template>
          <v-card min-width="300" max-width="400">
            <v-card-title class="d-flex align-center pb-2">
              <span>Сортировка</span>
              <v-spacer></v-spacer>
              <v-btn
                v-if="currentSort.length"
                size="small"
                icon="mdi-close"
                @click="clearSort"
                variant="text"
              ></v-btn>
            </v-card-title>

            <v-divider></v-divider>

            <v-list>
              <v-list-item
                v-for="column in sortableColumns"
                :key="column.value"
                @click="toggleSort(column)"
                :active="isColumnSorted(column)"
              >
                <template v-slot:prepend>
                  <v-icon v-if="getSortDirection(column) === 'asc'">mdi-arrow-up</v-icon>
                  <v-icon v-else-if="getSortDirection(column) === 'desc'">mdi-arrow-down</v-icon>
                </template>
                <v-list-item-title>{{ column.heading }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

        <Filters
          v-if="innerFilters.length"
          :countFilters="countFilters"
          :filters="innerFilters"
          :setFilter="handleSetFilter"
          :clearFilter="handleClearFilter"
        ></Filters>

        <slot name="header-buttons"></slot>
      </div>
    </div>
    <div>
      <Chip :chips="chips" @close-chip="handleClose"></Chip>
    </div>

    <!-- Responsive grid for cards -->
    <template v-if="!isLoading && list.length">
      <v-row>
        <v-col v-for="item in list" :key="item.id" cols="12" sm="12" md="6" lg="4" xl="3">
          <v-card elevation="2" class="specialist-card h-100">
            <v-card-title>
              {{ item.fio }}
            </v-card-title>
            <v-card-text>
              <div class="d-flex align-center mb-2 specialist-card__text">
                <v-icon size="small" class="mr-2">mdi-card-account-details</v-icon>
                <div><strong>Идентификационный номер:</strong> {{ item.registrationNumber }}</div>
              </div>

              <div class="d-flex align-center mb-2 specialist-card__text">
                <v-icon size="small" class="mr-2">mdi-calendar</v-icon>
                <div>
                  <strong>Дата принятия решения о включении сведений в реестр:</strong>
                  {{ shortDateFormat(item.inclusionProtocolDate) || '' }}
                </div>
              </div>

              <div class="d-flex align-center mb-2 specialist-card__text">
                <v-icon size="small" class="mr-2">mdi-calendar</v-icon>
                <div>
                  <strong>Дата внесения изменений:</strong>
                  {{ shortDateFormat(item.updated) || '' }}
                </div>
              </div>

              <div class="d-flex align-center mb-2 specialist-card__text">
                <v-icon size="small" class="mr-2">mdi-calendar</v-icon>
                <div>
                  <strong>Дата выдачи свидетельства о независимой оценке квалификации:</strong>
                  {{ shortDateFormat(item.inclusionCertificateDate) || '' }}
                </div>
              </div>

              <div class="d-flex align-center mb-2 specialist-card__text">
                <v-icon size="small" class="mr-2">mdi-calendar</v-icon>
                <div>
                  <strong>Дата принятия решения об исключении сведений из реестра:</strong>
                  {{ shortDateFormat(item.suspensionProtocolDate) || '' }}
                </div>
              </div>

              <div class="specialist-work-type specialist-card__text">
                <v-icon size="small" class="mr-2 align-self-start">mdi-hammer-wrench</v-icon>
                <div>{{ item.workType }}</div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-chip
                :color="item.statusTitle === SPECIALIST_STATUS.ACTIVE ? 'success' : 'error'"
                size="small"
                class="text-white specialist-card__text"
              >
                {{ item.statusTitle }}
              </v-chip>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template v-else-if="isLoading">
      <LoadingSpin></LoadingSpin>
    </template>
    <div v-if="!list.length && !isLoading" class="mt-6 text-center">
      Записи, удовлетворяющие критериям поиска отсутствуют
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-center mt-4">
      <v-pagination
        v-model="currentPage"
        :length="pagination.pages || 1"
        @update:model-value="handlePageChange"
        :total-visible="5"
      ></v-pagination>
    </div>
  </div>
</template>

<script setup>
import { SPECIALIST_STATUS } from '@/constants/app'
import { shortDateFormat } from '@/utils/format'

import { computed, ref, watch } from 'vue'
import { columns } from './TableColumns'
import BtnPrimary from '@/components/button/BtnPrimary.vue'
import Filters from '@/components/filter/Filters.vue'
import Chip from '@/components/chip/Chip.vue'
import LoadingSpin from '@/components/loading/LoadingSpin.vue'

const props = defineProps({
  list: Array,
  pagination: Object,
  sort: Array,
  search: String,
  searchHint: String,
  countFilters: Number,
  setPage: Function,
  setSort: Function,
  setFilter: Function,
  setSearch: Function,
  isLoading: Boolean,
})
// New sort related variables
const showSortMenu = ref(false)
const currentSort = computed(() => props.sort || [])

const chips = ref([])
// Local state
const innerSearch = ref('')
const currentPage = ref(1)

const emit = defineEmits(['clear-all-settings'])

function getDefaultFilters() {
  const filters = columns.map(column => ({
    filterBy: column.filterOptions?.filterByValue,
    filterOptions: column.filterOptions ? column.filterOptions : [],
    value: column.filterOptions?.filterDefaultValue || null,
    label: column.heading,
    type: column.filterOptions?.filterType,
    component: column.filterOptions?.filterComponent,
    selectValues: column.filterOptions?.filterValues || [],
    api: column.filterOptions?.filterApi || null,
  }))

  return filters
}

const innerFilters = ref(getDefaultFilters())

const resetDefaultFilters = () =>
  columns.map(column => ({
    filterBy: column.filterOptions?.filterByValue,
    filterOptions: column.filterOptions ? column.filterOptions : [],
    value: null,
    label: column.heading,
    type: column.filterOptions?.filterType,
    component: column.filterOptions?.filterComponent,
    selectValues: column.filterOptions?.filterValues || [],
    api: column.filterOptions?.filterApi || null,
  }))

// Handlers
const handleSearch = () => {
  props.setSearch(innerSearch.value || '')
}

const handleSetFilter = () => {
  props.setFilter(innerFilters.value)

  chips.value = JSON.parse(
    JSON.stringify(
      innerFilters.value.filter(item => {
        if (Array.isArray(item.value)) {
          if (item.value.length > 0) {
            return true
          }
        } else {
          if (item.value && item.filterBy) {
            return true
          }
        }
        return false
      })
    )
  )
}

const handleClearFilter = () => {
  chips.value = []
  innerFilters.value = resetDefaultFilters()
  props.setFilter([])
}

const clearAllSettings = () => {
  chips.value = []
  innerFilters.value = resetDefaultFilters()
  innerSearch.value = ''
  emit('clear-all-settings')
}

const handlePageChange = page => {
  props.setPage(page)
}
const handleClose = filter => {
  innerFilters.value.forEach(item => {
    if (item.filterBy === filter.filterBy) {
      item.value = null
    }
  })

  props.setFilter(innerFilters.value)
}

// Get only sortable columns
const sortableColumns = computed(() => columns.filter(column => column.sortOptions?.sortable))

// Check if column is currently sorted
const isColumnSorted = column => {
  return currentSort.value.some(sort => sort.sortBy === column.sortOptions.sortByValue)
}

// Get sort direction for a column
const getSortDirection = column => {
  const sortItem = currentSort.value.find(sort => sort.sortBy === column.sortOptions.sortByValue)
  return sortItem ? sortItem.sortType : null
}

// Toggle sort for a column
const toggleSort = column => {
  const sortByValue = column.sortOptions.sortByValue
  const currentDirection = getSortDirection(column)

  let newSort = [...currentSort.value]

  // Remove existing sort for this column
  newSort = newSort.filter(sort => sort.sortBy !== sortByValue)

  // Toggle direction or add new
  if (currentDirection === 'asc') {
    newSort.push({ sortBy: sortByValue, sortType: 'desc' })
  } else if (currentDirection === 'desc') {
    // Remove sort (already removed above)
  } else {
    // Not currently sorted - add ascending
    newSort.push({ sortBy: sortByValue, sortType: 'asc' })
  }

  props.setSort(newSort)
}

// Clear all sorts
const clearSort = () => {
  props.setSort([])
  showSortMenu.value = false
}

watch(
  () => props.pagination?.page,
  newPage => {
    if (newPage) {
      currentPage.value = newPage
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.filter-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.specialist-card {
  transition: all 0.3s ease;
}

.specialist-card__text {
  font-size: 17px;
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
.input-search {
  width: 365px;
}

button.filter-icon {
  font-size: medium;
}

button.filter-badge {
  position: relative;

  &::before {
    content: attr(data-count);
    position: absolute;
    top: 0;
    right: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    background-color: #ff5722;
    color: white;
    font-size: 13px;
    transform: translate(50%, -50%);
    z-index: 99;
  }
}
</style>
