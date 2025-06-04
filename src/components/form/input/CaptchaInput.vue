<template>
  <div class="form-field">
    <label v-if="label" :for="id" class="mb-1 d-block">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>
    <div class="captcha-container d-flex align-center mb-2">
      <div class="captcha-image me-4">
        <img :src="captchaUrl" alt="Captcha" width="180" height="50" />
      </div>
      <v-btn icon size="small" variant="text" @click="refreshCaptcha" :disabled="isLoadingCaptcha">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>
    <v-text-field
      :id="id"
      v-model="value"
      :placeholder="placeholder"
      :error-messages="shouldShowError ? errorMessage : ''"
      :disabled="disabled"
      variant="outlined"
      density="comfortable"
      bg-color="white"
    ></v-text-field>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'
import { computed, ref } from 'vue'

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
  captchaUrl: {
    type: String,
    default: '',
  },
})

const { value, errorMessage, meta } = useField(() => props.name)

const shouldShowError = computed(() => {
  return errorMessage.value && (meta.touched || (value.value && !meta.valid))
})

const isLoadingCaptcha = ref(false)
const emit = defineEmits(['refresh-captcha'])

const refreshCaptcha = () => {
  isLoadingCaptcha.value = true
  emit('refresh-captcha')
  setTimeout(() => {
    isLoadingCaptcha.value = false
  }, 500)
}
</script>

<style scoped>
.form-field {
  margin-bottom: 1.5rem;
}

.text-error {
  color: #ff5252;
}

.captcha-image {
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
