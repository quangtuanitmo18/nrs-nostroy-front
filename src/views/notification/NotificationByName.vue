<template>
  <div class="notification-form pa-4">
    <form @submit.prevent="onSubmit">
      <!-- Region -->
      <SelectInput
        id="region"
        name="region"
        label="Регион проживания (по месту регистрации)"
        :options="regionOptions"
        required
      />

      <!-- Full Name -->
      <TextInput id="fullName" name="fullName" label="Фамилия, Имя, Отчество" required />

      <!-- Date of Birth -->
      <DateInput id="birthDate" name="birthDate" label="Дата рождения" required />

      <!-- Email -->
      <TextInput
        id="email"
        name="email"
        label="Укажите адрес электронной почты"
        type="email"
        required
      />

      <!-- Phone -->
      <PhoneInput
        id="phone"
        name="phone"
        label="Укажите контактный номер телефона"
        :mask="maskaRules.russianPhone"
      />

      <!-- Captcha -->
      <CaptchaInput
        id="captcha"
        name="captcha"
        label="Укажите код с картинки"
        :captcha-url="captchaUrl"
        @refresh-captcha="refreshCaptcha"
        required
      />

      <!-- Submit Button -->
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

      <!-- Required Fields Note -->
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
import { notificationByNameSchema } from '@/schemas/notification'
import { notificationService } from '@/services/notification'
import { provide, ref, watch } from 'vue'

import CaptchaInput from '@/components/form/input/CaptchaInput.vue'
import DateInput from '@/components/form/input/DateInput.vue'
import PhoneInput from '@/components/form/input/PhoneNumberInput.vue'
import SelectInput from '@/components/form/input/SelectInput.vue'
import TextInput from '@/components/form/input/TextInput.vue'
import maskaRules from '@/utils/RulesMaskaInput'

// Regions options
const regionOptions = [
  { value: 'Амурская область', label: 'Амурская область' },
  { value: 'Архангельская область', label: 'Архангельская область' },
  { value: 'Астраханская область', label: 'Астраханская область' },
  { value: 'Белгородская область', label: 'Белгородская область' },
  { value: 'Брянская область', label: 'Брянская область' },
  // Thêm các vùng khác của Nga
  { value: 'Москва', label: 'Москва' },
  { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
  // ...các vùng khác
]

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
  region: '',
  fullName: '',
  birthDate: '',
  email: '',
  phone: '',
  captcha: '',
}

const { onSubmit, isSubmitting, isSuccess, submitError, isValid, errors, form } = useFormSubmit(
  initialValuesForm,
  notificationByNameSchema,
  notificationService.submitNotificationByName,
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

// Provide form context để components con có thể sử dụng
provide('form', form)

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
