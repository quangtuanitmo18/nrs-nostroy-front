<template>
  <div class="notification-form pa-4">
    <template v-if="!isLoadingGenerateCaptcha">
      <form @submit.prevent="onSubmit">
        <!-- СНИЛС -->
        <TextInput
          id="snils"
          name="snils"
          label="Укажите СНИЛС"
          required
          :mask="maskaRules.snils"
        />

        <!-- Email -->
        <TextInput
          id="email"
          name="email"
          label="Укажите адрес электронной почты"
          type="email"
          required
        />

        <!-- Телефон -->
        <PhoneInput
          id="phone"
          name="phone"
          label="Укажите контактный номер телефона"
          :mask="maskaRules.russianPhone"
        />

        <!-- Капча -->
        <CaptchaInput
          id="captchaCode"
          name="captchaCode"
          label="Укажите код с картинки"
          :captcha-url="captchaImageUrl"
          @refresh-captcha="refetchGenerateCaptcha"
          required
          :mask="maskaRules.captchaCode"
        />

        <!-- Ошибки полей -->
        <FieldErrors
          :fieldErrors="fieldErrors"
          :generalError="generalError"
          :hasErrors="hasErrors"
        />

        <!-- Кнопка отправки -->
        <div class="d-flex">
          <v-btn
            type="submit"
            color="primary"
            variant="elevated"
            size="large"
            :loading="isSubmitting"
            class="mt-4"
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
      </form>
    </template>
    <template v-else>
      <LoadingSpin />
    </template>
  </div>
</template>

<script setup>
import { computed, ref, toRaw, watch } from 'vue'

import CaptchaInput from '@/components/form/CaptchaInput.vue'
import PhoneInput from '@/components/form/PhoneNumberInput.vue'
import TextInput from '@/components/form/TextInput.vue'
import maskaRules from '@/utils/RulesMaskaInput'
import { useQueryGenerateCaptcha } from '@/services/notification'
import { notificationBySnilsSchema } from '@/schemas/notification'
import { useFormSubmit } from '@/composables/useFormSubmit'
import { notificationApi } from '@/apis/notifications'
import LoadingSpin from '@/components/loading/LoadingSpin.vue'
import { useApiErrors } from '@/composables/useApiErrors'
import FieldErrors from '@/components/form/FieldErrors.vue'

// Notifications
const showSuccessMessage = ref(false)

// API Errors
const { fieldErrors, generalError, hasErrors, setFieldErrors, clearFieldErrors } = useApiErrors()

// Form setup
const initialValuesForm = {
  snils: '',
  email: '',
  phone: '',
  captchaCode: '',
}

// Get captcha data
const {
  dataGenerateCaptcha,
  refetchGenerateCaptcha,
  isLoadingGenerateCaptcha,
  isFetchingGenerateCaptcha,
} = useQueryGenerateCaptcha()

const captchaImageUrl = computed(() => {
  if (!isFetchingGenerateCaptcha.value) {
    return dataGenerateCaptcha.value.imgBase64
  }
})

const captchaToken = computed(() => {
  if (!isFetchingGenerateCaptcha.value) {
    return dataGenerateCaptcha.value.token
  }
})

// submit form notification by snils
const { onSubmit, isSubmitting, isValid, errors } = useFormSubmit(
  initialValuesForm,
  notificationBySnilsSchema,
  notificationApi.notificationRequestBySnils,
  {
    extraData: () => ({
      captchaToken: captchaToken.value,
    }),
    onSuccess: () => {
      showSuccessMessage.value = true
      refetchGenerateCaptcha()
      clearFieldErrors()
    },
    onError: error => {
      console.log('Error submitting form:', error)
      setFieldErrors(error)
      refetchGenerateCaptcha()
    },
  }
)

// Clear API errors when form validation errors change
watch(
  () => errors.value,
  () => {
    console.log('Form validation errors changed:', toRaw(errors.value))
    if (Object.keys(errors.value || {}).length > 0) {
      clearFieldErrors() // Clear API errors when form has validation errors
    }
  },
  { deep: true }
)
</script>

<style scoped>
.notification-form {
  max-width: 600px;
  margin: 0 auto;
  background-color: var(--color-blue-light);
}
</style>
