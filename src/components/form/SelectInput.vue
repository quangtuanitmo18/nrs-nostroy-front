<template>
  <div class="mb-4">
    <label v-if="label" :for="id" class="mb-1 d-block">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>
    <v-select
      :id="id"
      v-model="value"
      :items="options"
      :placeholder="placeholder"
      :error-messages="shouldShowError ? errorMessage : ''"
      :disabled="disabled"
      density="comfortable"
      variant="outlined"
      bg-color="white"
      item-title="label"
      item-value="value"
      clearable
      filterable
      :menu-props="{ maxHeight: 400 }"
    >
      <!-- Search input -->
      <template v-slot:prepend-inner>
        <v-icon :icon="searchEnabled ? 'mdi-magnify' : ''" />
      </template>

      <!-- Display grouped items correctly -->
      <template v-slot:item="{ item, props }">
        <v-list-subheader
          v-if="item.raw.header"
          :key="item.raw.header"
          class="text-primary font-weight-bold"
        >
          {{ item.raw.header }}
        </v-list-subheader>
        <v-divider v-if="item.raw.divider"></v-divider>
        <v-list-item v-if="!item.raw.header && !item.raw.disabled" v-bind="props"></v-list-item>
      </template>
    </v-select>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  searchEnabled: {
    type: Boolean,
    default: true,
  },
})

// Connect field to form
const { value, errorMessage, meta } = useField(() => props.name)

// Display error when:
// 1. Field has been touched AND has error
// 2. OR field has value and is invalid
const shouldShowError = computed(() => {
  return errorMessage.value && (meta.touched || (value.value && !meta.valid))
})

// Custom filter function for improved search
const customFilter = (item, query, itemText) => {
  // Skip filtering for headers and dividers
  if (item.header || item.divider) return true

  // Convert to lowercase for case-insensitive search
  const text = item.label?.toLowerCase() || ''
  const searchText = query.toLowerCase()

  // Return true if item contains the search query
  return text.includes(searchText)
}
</script>

<style scoped>
.text-error {
  color: #ff5252;
}
:deep(.v-select .v-field__input) {
  padding-left: 8px;
}
</style>
