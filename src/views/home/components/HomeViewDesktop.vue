<template>
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
    @clear-all-settings="emit('clear-all-settings')"
  ></AnonamisTableFilter>
</template>

<script setup>
import { AnonamisTableFilter } from 'anonamis'
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
})
const emit = defineEmits(['clear-all-settings'])
</script>
