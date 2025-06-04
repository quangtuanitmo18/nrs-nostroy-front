<template>
  <div class="notification-form pa-4">
    <form @submit.prevent="onSubmit">
      <!-- СНИЛС -->
      <TextInput id="snils" name="snils" label="Укажите СНИЛС" required />

      <!-- Email -->
      <TextInput
        id="email"
        name="email"
        label="Укажите адрес электронной почты"
        type="email"
        required
      />

      <!-- Телефон -->
      <PhoneInput id="phone" name="phone" label="Укажите контактный номер телефона" />

      <!-- Капча -->
      <CaptchaInput
        id="captcha"
        name="captcha"
        label="Укажите код с картинки"
        :captcha-url="captchaUrl"
        @refresh-captcha="refreshCaptcha"
        required
      />

      <!-- Кнопка отправки -->
      <div class="d-flex">
        <v-btn
          type="submit"
          color="primary"
          variant="elevated"
          size="large"
          :loading="isSubmitting"
          :disabled="!isValid || isSubmitting"
        >
          Отправить
        </v-btn>
      </div>

      <!-- Пояснение -->
      <div class="mt-4 text-caption text-grey">
        <span class="text-error">*</span> - отмечены поля обязательные для заполнения
      </div>

      <!-- Snackbars -->
      <v-snackbar v-model="showSuccessMessage" color="success" timeout="3000">
        Уведомление успешно отправлено
      </v-snackbar>

      <v-snackbar v-model="showErrorMessage" color="error" timeout="3000">
        {{ submitError }}
      </v-snackbar>
    </form>
  </div>
</template>

<script setup>
import { useFormSubmit } from '@/composables/useFormSubmit'
import { notificationBySnilsSchema } from '@/schemas/notification'
import { notificationService } from '@/services/notification'
import { ref, watch } from 'vue'

import CaptchaInput from '@/components/form/CaptchaInput.vue'
import PhoneInput from '@/components/form/PhoneNumberInput.vue'
import TextInput from '@/components/form/TextInput.vue'

// Captcha management
const captchaUrl = ref('https://picsum.photos/180/50?random=' + Date.now())
const refreshCaptcha = () => {
  captchaUrl.value = 'https://picsum.photos/180/50?random=' + Date.now()
}

// Notifications
const showSuccessMessage = ref(false)
const showErrorMessage = ref(false)

// Form setup
const initialValuesForm = {
  snils: '',
  email: '',
  phone: '',
  captcha: '',
}

const { onSubmit, isSubmitting, isSuccess, submitError, isValid, errors } = useFormSubmit(
  initialValuesForm,
  notificationBySnilsSchema,
  notificationService.submitNotification,
  {
    onSuccess: () => {
      showSuccessMessage.value = true
      refreshCaptcha()
    },
    onError: error => {
      showErrorMessage.value = true

      if (error?.response?.data?.field === 'captcha') {
        refreshCaptcha()
      }
    },
  }
)

watch(
  () => errors.value,
  newErrors => console.log('Errors updated:', newErrors)
) // Watch for error messages

watch(
  () => submitError.value,
  newVal => {
    showErrorMessage.value = Boolean(newVal)
  }
)
</script>

<style scoped>
.notification-form {
  max-width: 600px;
  margin: 0 auto;
  background-color: var(--color-blue-light);
}
</style>
