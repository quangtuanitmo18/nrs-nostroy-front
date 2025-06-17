<template>
  <TableWithFilter
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
    :isLoading="isFirstLoading"
    @clear-all-settings="emit('clear-all-settings')"
  ></TableWithFilter>
</template>

<script setup>
import TableWithFilter from '@/components/table/TableWithFilter.vue'
import { columns } from './TableColumns.js'

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  pagination: {
    type: Object,
    default: () => ({}),
  },
  sort: {
    type: Array,
    default: () => [],
  },
  search: {
    type: String,
    default: '',
  },
  searchHint: {
    type: String,
    default: 'Поиск по ФИО и Идентификационному номеру',
  },
  countFilters: {
    type: Number,
    default: 0,
  },
  setPage: {
    type: Function,
    required: true,
  },
  setSort: {
    type: Function,
    required: true,
  },
  setFilter: {
    type: Function,
    required: true,
  },
  setSearch: {
    type: Function,
    required: true,
  },
  isFirstLoading: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['clear-all-settings'])
</script>
