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
      <DatePicker id="birthDate" name="birthDate" label="Дата рождения" required />

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
      <!-- <CaptchaInput
        id="captcha"
        name="captcha"
        label="Укажите код с картинки"
        :captcha-url="captchaUrl"
        @refresh-captcha="refreshCaptcha"
        required
      /> -->

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
import { ref } from 'vue'

import PhoneInput from '@/components/form/PhoneNumberInput.vue'
import SelectInput from '@/components/form/SelectInput.vue'
import TextInput from '@/components/form/TextInput.vue'
import maskaRules from '@/utils/RulesMaskaInput'
import { useQueryGenerateCaptcha } from '@/services/notification'

// Regions options
const regionOptions = [
  { value: 'Амурская область', label: 'Амурская область' },
  { value: 'Архангельская область', label: 'Архангельская область' },
  { value: 'Астраханская область', label: 'Астраханская область' },
  { value: 'Белгородская область', label: 'Белгородская область' },
  { value: 'Брянская область', label: 'Брянская область' },
  { value: 'Москва', label: 'Москва' },
  { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
  // Add more regions as needed
]

// Captcha management

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
  // captcha: '',
}

// const { onSubmit, isSubmitting, isSuccess, submitError, isValid, errors } = useFormSubmit(
//   initialValuesForm,
//   notificationByNameSchema,
//   notificationService.submitNotificationByName,
//   {
//     onSuccess: () => {
//       showSuccessMessage.value = true
//       refreshCaptcha()
//     },
//     onError: error => {
//       showErrorMessage.value = true

//       if (error?.response?.data?.field === 'captcha') {
//         refreshCaptcha()
//       }
//     },
//   }
// )

// watch(
//   () => submitError.value,
//   newVal => {
//     showErrorMessage.value = Boolean(newVal)
//   }
// )

// watch(
//   () => errors.value,
//   newErrors => {
//     console.log('Errors updated:', newErrors)
//     console.log(isValid)
//   }
// ) // Watch for error messages
</script>

<style scoped>
.notification-form {
  max-width: 600px;
  margin: 0 auto;
  background-color: var(--color-blue-light);
}
</style>
