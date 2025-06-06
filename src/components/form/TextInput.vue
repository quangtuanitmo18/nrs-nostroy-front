<template>
  <div class="form-field">
    <label v-if="label" :for="id" class="mb-1 d-block">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>
    <v-text-field
      :id="id"
      v-model="value"
      :placeholder="placeholder"
      :error-messages="shouldShowError ? errorMessage : ''"
      :disabled="disabled"
      :type="type"
      v-maska="mask"
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
  type: {
    type: String,
    default: 'text',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  mask: {
    type: Object,
    default: null,
  },
})

// Sử dụng useField để tự động kết nối với form
const { value, errorMessage, meta } = useField(() => props.name)

// Hiển thị error khi:
// 1. Field đã được touched (blur ít nhất 1 lần) VÀ có error
// 2. HOẶC field có value và invalid (real-time validation khi typing)
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
