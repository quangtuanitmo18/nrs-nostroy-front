<template>
  <div v-if="Object.keys(fieldErrors).length > 0" class="error-fields">
    <v-list density="compact" class="error-list">
      <v-list-item
        v-for="(message, field) in fieldErrors"
        :key="field"
        class="text-error"
        prepend-icon="mdi-alert-circle-outline"
      >
        {{ field }}: {{ message }}
      </v-list-item>
    </v-list>
  </div>
  <template v-else>
    <div v-if="hasErrors" class="errors-section">
      <v-alert type="error" class="ma-2">
        {{ generalError }}
      </v-alert>
    </div>
  </template>
</template>

<script setup>
const props = defineProps({
  fieldErrors: {
    type: Object,
    default: () => ({}),
  },
  generalError: {
    type: String,
    default: '',
  },
  hasErrors: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.errors-section {
  border-radius: 4px;
  border-left: 4px solid #ff5252;
  background-color: #fff1f1;
}

.error-list {
  background-color: transparent;
}
</style>
