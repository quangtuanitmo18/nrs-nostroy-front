<template>
  <div class="mb-4">
    <label v-if="label" :for="id" class="mb-1 d-block">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>
    <v-menu
      v-model="menuOpen"
      :close-on-content-click="false"
      transition="scale-transition"
      min-width="auto"
    >
      <template #activator="{ props }">
        <v-text-field
          :id="id"
          v-model="displayDate"
          :placeholder="placeholder || 'ДД.ММ.ГГГГ'"
          :error-messages="shouldShowError ? errorMessage : ''"
          :disabled="disabled"
          readonly
          v-bind="props"
          prepend-icon="mdi-calendar"
          variant="outlined"
          density="comfortable"
          bg-color="white"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="pickerDate"
        @update:model-value="onDateSelected"
        :max="maxDate"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'
import { computed, inject, ref } from 'vue'

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

// Получить контекст формы от родителя
const form = inject('form', null)

// Подключиться к полю формы
const { value, errorMessage, meta } = useField(() => props.name, undefined, {
  form,
})

// Состояние меню
const menuOpen = ref(false)

// Максимальная дата - сегодня
const maxDate = new Date().toISOString().split('T')[0]

// Текущая дата для отображения в поле ввода (формат DD.MM.YYYY)
const displayDate = ref('')

// Текущая дата для date picker (формат YYYY-MM-DD)
const pickerDate = ref('')

// При первоначальной загрузке, если есть значение, установить отображение
if (value.value) {
  pickerDate.value = value.value
  const [year, month, day] = value.value.split('-')
  displayDate.value = `${day}.${month}.${year}`
}

// Обработчик выбора даты
const onDateSelected = selectedDate => {
  if (selectedDate) {
    // Обновить value (для формы)
    value.value = selectedDate

    // Обновить отображаемое значение
    const [year, month, day] = selectedDate.split('-')
    displayDate.value = `${day}.${month}.${year}`

    // Закрыть меню
    menuOpen.value = false
  }
}

// Логика отображения ошибки
const shouldShowError = computed(() => {
  return errorMessage.value && (meta.touched || (value.value && !meta.valid))
})
</script>

<style scoped>
.text-error {
  color: #ff5252;
}
</style>
