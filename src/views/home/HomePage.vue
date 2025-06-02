<template>
  <AnonamisTableFilter
    :columns="columns"
    :items="list"
    :pagination="pagination"
    :sort="sort"
    :countFilters="countFilters"
    :setPage="setPage"
    :setSort="setSort"
    :setFilter="setFilter"
    @clear-all-settings="handleClearAllSettings"
  ></AnonamisTableFilter>
</template>

<script setup>
import { AnonamisTableFilter } from 'anonamis';
import { computed, ref, shallowRef, toRaw, watch } from 'vue';
import { list } from './mockdata.js';
const page = ref(1);
const filters = shallowRef({});
const sort = shallowRef([]);
// Example sort
// const sort = [{
//   sortBy: "id",
//   sortType: "asc"
// }]

const size = 5;

const pagination = shallowRef({
  count: list.value.length,
  pages: Math.ceil(list.value.length / size),
  page: 1,
  size: size,
});

console.log(toRaw(filters.value));

const countFilters = computed(() => Object.keys(filters.value).length);

const columns = [
  {
    heading: 'Дата контроля',
    value: 'controlDate',
    sortOptions: {
      sortable: true,
      sortByValue: 'controlDate',
    },
    filterOptions: {
      filterByValue: 'controlDate',
      filterType: 6,
    },
  },
  {
    heading: 'ИНН',
    value: 'inn',
    sortOptions: {
      sortable: true,
      sortByValue: 'inn',
    },
    filterOptions: {
      filterByValue: 'inn',
      filterType: 5,
    },
  },
  {
    heading: 'Наименование',
    value: 'shortname',
    sortOptions: {
      sortable: true,
      sortByValue: 'shortname',
    },
    filterOptions: {
      filterByValue: 'shortname',
      filterType: 5,
    },
  },
  {
    heading: 'Локальное время',
    value: 'timeDiff',
    type: 'local-time',
    sortOptions: {
      sortable: true,
      sortByValue: 'timeDiff',
    },
    filterOptions: {
      // filterByValue: 'timeDiff',
      filterType: 5,
    },
  },
];

const setPage = value => {
  page.value = value;
};

const setSort = value => {
  sort.value = value;
};

const handleClearAllSettings = () => {
  page.value = 1;
  filters.value = {};
  sort.value = [];
};

const setFilter = dataFilters => {
  // dataFilters always is arr
  filters.value = dataFilters.reduce((acc, item) => {
    const type = typeof item.value;
    if (
      (type === 'object' && item.value?.length) ||
      (type === 'string' && item.value) ||
      (type === 'number' && item.value) ||
      (type === 'boolean' && item.value === false)
    ) {
      return {
        ...acc,
        [item.filterBy]: item.value,
      };
    }

    return acc;
  }, {});
};

// Add this after your other code
watch(
  filters,
  newFilters => {
    console.log('Filters changed:', toRaw(newFilters));
  },
  { deep: true }
);
</script>
