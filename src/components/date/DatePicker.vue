<template>
  <div class="mb-4">
    <label v-if="label" :for="id" class="mb-1 d-block">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>

    <VueDatePicker
      v-model="dateValue"
      :id="id"
      :disabled="disabled"
      :enable-time-picker="false"
      :max-date="maxDateObject"
      select-text="Выбрать"
      cancel-text="Закрыть"
      month-name-format="long"
      auto-apply
      locale="ru"
      position="auto"
      :teleport="true"
    >
      <template #trigger>
        <v-text-field
          :id="id"
          v-model="inputValue"
          :placeholder="placeholder || 'ДД.ММ.ГГГГ'"
          :error-messages="shouldShowError ? errorMessage : ''"
          :disabled="disabled"
          readonly
          @click="openPicker"
          variant="outlined"
          density="comfortable"
          bg-color="white"
          class="date-input"
          clearable
          @click:clear="clearDate"
        ></v-text-field>
      </template>
    </VueDatePicker>
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import { useField } from 'vee-validate'
import { computed, ref, watch } from 'vue'

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
  maxDate: {
    type: String,
    default: '', // Будем использовать сегодняшний день в computed
  },
})

// Connect field to VeeValidate
const { value: modelValue, errorMessage, meta } = useField(() => props.name, undefined)

// Reactive max date
const maxDateObject = computed(() => {
  if (!props.maxDate) {
    return new Date() // Default to today
  }

  try {
    return new Date(props.maxDate)
  } catch (e) {
    console.error('Invalid max date:', e)
    return new Date()
  }
})

// Use a ref for the date value that works with vue-datepicker
const dateValue = ref(null)

// Display value for the text field with masking
const inputValue = ref('')

// Clear the date
function clearDate(event) {
  event.stopPropagation()
  dateValue.value = null
  inputValue.value = ''
  modelValue.value = ''
}

// Format date from JS Date to YYYY-MM-DD (for backend)
function formatDateForModel(date) {
  if (!date) return ''

  try {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
  } catch (e) {
    console.error('Error formatting date for model:', e)
    return ''
  }
}

// Format date from YYYY-MM-DD to DD.MM.YYYY (for display)
function formatDateDisplay(dateStr) {
  if (!dateStr) return ''

  try {
    if (typeof dateStr === 'string') {
      // Parse YYYY-MM-DD
      const [year, month, day] = dateStr.split('-')
      return `${day}.${month}.${year}`
    } else if (dateStr instanceof Date) {
      // Parse from Date object
      const day = String(dateStr.getDate()).padStart(2, '0')
      const month = String(dateStr.getMonth() + 1).padStart(2, '0')
      const year = dateStr.getFullYear()
      return `${day}.${month}.${year}`
    }
    return ''
  } catch (e) {
    console.error('Error formatting date for display:', e)
    return ''
  }
}

// Open picker programmatically
function openPicker() {
  // This will be handled by the VueDatePicker trigger template
}

// Display error only when field was touched or has value
const shouldShowError = computed(() => {
  return errorMessage.value && (meta.touched || (modelValue.value && !meta.valid))
})

// Watch for changes from the date picker
watch(
  dateValue,
  newDate => {
    if (!newDate) {
      modelValue.value = ''
      inputValue.value = ''
      return
    }

    try {
      // Set model value in YYYY-MM-DD format
      const formattedDate = formatDateForModel(newDate)
      modelValue.value = formattedDate

      // Set input value in DD.MM.YYYY format
      inputValue.value = formatDateDisplay(newDate)
    } catch (e) {
      console.error('Error watching date value:', e)
    }
  },
  { deep: true }
)

// Initialize values from model
watch(
  modelValue,
  newValue => {
    if (!newValue) {
      dateValue.value = null
      inputValue.value = ''
      return
    }

    try {
      // Parse from YYYY-MM-DD to Date object
      dateValue.value = new Date(newValue)

      // Set input value in DD.MM.YYYY format
      inputValue.value = formatDateDisplay(newValue)
    } catch (e) {
      console.error('Error watching model value:', e)
      dateValue.value = null
      inputValue.value = ''
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.form-field {
  width: 100%;
  margin-bottom: 16px;
}

.date-input {
  width: 100%;
}

.text-error {
  color: #ff5252;
}
</style>
