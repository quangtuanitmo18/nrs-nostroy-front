<template>
  <div class="form-field">
    <label v-if="label" :for="id" class="mb-1 d-block">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>
    <v-text-field
      :id="id"
      v-model="displayValue"
      :placeholder="placeholder"
      :error-messages="shouldShowError ? errorMessage : ''"
      :disabled="disabled"
      prefix="+7"
      variant="outlined"
      density="comfortable"
      bg-color="white"
    ></v-text-field>
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
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const { value, errorMessage, meta } = useField(() => props.name)

// Handle phone formatting
const displayValue = computed({
  get: () => value.value || '',
  set: val => {
    const numericValue = val?.replace(/\D/g, '') || ''
    value.value = numericValue
  },
})

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
