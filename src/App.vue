<template>
  <global-styles>
    <component :is="layouts[currentLayout]" />
  </global-styles>
</template>

<script setup>
// import GlobalStyles directly from its file (update the path if needed)
import GlobalStyles from '@/components/GlobalStyles.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import SimpleLayout from '@/layouts/SimpleLayout.vue';

import { computed } from 'vue';
import { useRoute } from 'vue-router';

const layouts = {
  'app-layout': AppLayout,
  'simple-layout': SimpleLayout,
};

const route = useRoute();

const currentLayout = computed(() => route.meta.layout);
</script>
