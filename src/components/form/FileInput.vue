<template>
  <div class="mb-4">
    <label v-if="label" :for="id" class="mb-1 d-block">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>

    <v-file-input
      :id="id"
      v-model="value"
      :placeholder="placeholder"
      :error-messages="error"
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept"
      :show-size="true"
      variant="outlined"
      density="comfortable"
      prepend-icon="mdi-paperclip"
      bg-color="white"
      @blur="$emit('blur')"
      @click:clear="$emit('clear')"
    >
      <template v-if="$slots['selection']" v-slot:selection="slotProps">
        <slot name="selection" v-bind="slotProps"></slot>
      </template>
    </v-file-input>
  </div>
</template>

<script setup>
const value = defineModel()

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Выберите файл',
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: String,
    default: '',
  },
})

defineEmits(['blur', 'clear'])
</script>

<style scoped>
.text-error {
  color: #ff5252;
}
</style>
