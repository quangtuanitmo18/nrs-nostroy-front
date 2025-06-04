<template>
  <div class="form-field">
    <label v-if="label" :for="id" class="mb-1 d-block">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>
    <v-select
      :id="id"
      v-model="value"
      :items="options"
      item-title="label"
      item-value="value"
      :placeholder="placeholder"
      :error-messages="shouldShowError ? errorMessage : ''"
      :disabled="disabled"
      variant="outlined"
      density="comfortable"
      bg-color="white"
    ></v-select>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'
import { computed, inject } from 'vue'

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
})

// Get form context from parent
const form = inject('form', null)

// Connect field to form
const { value, errorMessage, meta } = useField(() => props.name, undefined, {
  form,
})

// Display error when:
// 1. Field has been touched AND has error
// 2. OR field has value and is invalid
const shouldShowError = computed(() => {
  return errorMessage.value && (meta.touched || (value.value && !meta.valid))
})
</script>

<style scoped>
.form-field {
}

.text-error {
  color: #ff5252;
}
</style>
