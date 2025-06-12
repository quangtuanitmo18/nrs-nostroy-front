<template>
  <div class="d-flex flex-column ga-2">
    <!-- Search and filter controls -->
    <div class="d-flex justify-space-between align-items-center mb-4">
      <div class="table-search" v-if="searchHint">
        <v-text-field
          clearable
          @click:clear="setSearch('')"
          @keydown.enter="handleSearch"
          variant="underlined"
          label="Поиск"
          :hint="searchHint"
          v-model="innerSearch"
          persistent-hint
        />
        <v-icon
          @click="handleSearch"
          :class="{ active: innerSearch }"
          class="table-search-icon"
          icon="mdi-magnify"
        ></v-icon>
      </div>

      <div class="pull-right mr-2 d-flex ga-2">
        <v-btn
          height="46px"
          variant="flat"
          @click="clearAllSettings"
          title="Очистить все настройки"
          class="filter-icon"
          >Очистить</v-btn
        >
        <Filters
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
    <v-row>
      <v-col v-for="item in list" :key="item.id" cols="12" sm="12" md="6" lg="4" xl="3">
        <v-card elevation="2" class="specialist-card h-100">
          <v-card-title class="text-primary">
            {{ item.fio }}
          </v-card-title>
          <v-card-text>
            <div class="d-flex align-center mb-2">
              <v-icon size="small" color="primary" class="mr-2">mdi-card-account-details</v-icon>
              <div>
                ID: <strong>{{ item.registrationNumber }}</strong>
              </div>
            </div>

            <div class="d-flex align-center mb-2">
              <v-icon size="small" color="primary" class="mr-2">mdi-calendar</v-icon>
              <div>
                Дата принятия решения о включении сведений в реестр:
                <strong>{{ item.inclusionProtocolDate || 'Н/Д' }}</strong>
              </div>
            </div>

            <div class="d-flex align-center mb-2">
              <v-icon size="small" color="primary" class="mr-2">mdi-certificate</v-icon>
              <div>
                Дата внесения изменений:
                <strong>{{ item.updated || 'Н/Д' }}</strong>
              </div>
            </div>

            <div class="d-flex align-center mb-2">
              <v-icon size="small" color="primary" class="mr-2">mdi-certificate</v-icon>
              <div>
                Дата выдачи свидетельства о независимой оценке квалификации:
                <strong>{{ item.inclusionCertificateDate || 'Н/Д' }}</strong>
              </div>
            </div>

            <div class="d-flex align-center mb-2">
              <v-icon size="small" color="primary" class="mr-2">mdi-certificate</v-icon>
              <div>
                Дата принятия решения об исключении сведений из реестра:
                <strong>{{ item.suspensionProtocolDate || 'Н/Д' }}</strong>
              </div>
            </div>

            <div class="specialist-work-type">
              <v-icon size="small" color="primary" class="mr-2 align-self-start"
                >mdi-hammer-wrench</v-icon
              >
              <div>{{ item.workType }}</div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-chip
              :color="item.statusTitle === SPECIALIST_STATUS.ACTIVE ? 'success' : 'error'"
              size="small"
              class="text-white"
            >
              {{ item.statusTitle }}
            </v-chip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

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
import { ref, watch } from 'vue'
import { columns } from './TableColumns'
import Chip from 'anonamis/src/components/chip/Chip.vue'
import Filters from 'anonamis/src/components/filter/Filters.vue'
import { SPECIALIST_STATUS } from '@/constants/app'

const props = defineProps({
  list: Array,
  pagination: Object,
  sort: Array,
  search: String,
  searchHint: String,
  countFilters: Number,
  isLoadingSpecialists: Boolean,
  isFetchingSpecialists: Boolean,
  setPage: Function,
  setSort: Function,
  setFilter: Function,
  setSearch: Function,
})

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

  chips.value = JSON.parse(
    JSON.stringify(
      filters.filter(item => {
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

const handleSetFilter = filters => {
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
