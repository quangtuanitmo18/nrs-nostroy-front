<template>
  <global-styles>
    <error-boundary>
      <component :is="layouts[currentLayout]" />
    </error-boundary>
  </global-styles>
</template>

<script setup>
// import GlobalStyles directly from its file (update the path if needed)
import AppLayout from '@/layouts/AppLayout.vue'
import SimpleLayout from '@/layouts/SimpleLayout.vue'
import GlobalStyles from '@/styles/GlobalStyles.vue'

import ErrorBoundary from '@/components/ErrorBoundary.vue'

import { computed } from 'vue'
import { useRoute } from 'vue-router'

const layouts = {
  'app-layout': AppLayout,
  'simple-layout': SimpleLayout,
}

const route = useRoute()

const currentLayout = computed(() => route.meta.layout)
</script>
