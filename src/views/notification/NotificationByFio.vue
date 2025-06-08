<template>
  <template v-if="!isLoadingGenerateCaptcha && !isLoadingRegionsList">
    <div class="notification-form pa-4">
      <form @submit.prevent="onSubmit">
        <!-- Region -->
        <SelectInput
          id="region"
          name="region"
          label="Регион проживания (по месту регистрации)"
          :options="regionOptions"
          placeholder="Поиск региона..."
          required
        />

        <!-- Full Name -->
        <TextInput id="fio" name="fio" label="Фамилия, Имя, Отчество" required />

        <!-- Date of Birth -->
        <DatePicker id="birthdate" name="birthdate" label="Дата рождения" required />

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

        <!-- Submit Button -->
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

        <!-- Required Fields Note -->
        <div class="mt-4 text-caption text-grey">
          <span class="text-error">*</span> - отмечены поля обязательные для заполнения
        </div>

        <v-snackbar v-model="showSuccessMessage" color="success" timeout="3000">
          Уведомление успешно отправлено
        </v-snackbar>
      </form>
    </div>
  </template>

  <template v-else>
    <LoadingSpin />
  </template>
</template>
<script setup>
import { computed, ref, toRaw, watch } from 'vue'

import PhoneInput from '@/components/form/PhoneNumberInput.vue'
import SelectInput from '@/components/form/SelectInput.vue'
import TextInput from '@/components/form/TextInput.vue'
import maskaRules from '@/utils/RulesMaskaInput'
import { useQueryGenerateCaptcha, useQueryGetListRegions } from '@/services/notification'
import { notificationByFioSchema } from '@/schemas/notification'
import { useFormSubmit } from '@/composables/useFormSubmit'
import { notificationApi } from '@/apis/notifications'
import CaptchaInput from '@/components/form/CaptchaInput.vue'
import { useApiErrors } from '@/composables/useApiErrors'
import DatePicker from '@/components/date/DatePicker.vue'

// Notifications
const showSuccessMessage = ref(false)

const { fieldErrors, generalError, hasErrors, setFieldErrors, clearFieldErrors } = useApiErrors()

console.log('fieldErrors', fieldErrors.value)

// Form setup
const initialValuesForm = {
  region: '',
  fio: '',
  birthdate: '',
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

// Data region
const { dataRegionsList, isLoadingRegionsList } = useQueryGetListRegions()

const regionOptions = computed(() => {
  if (!dataRegionsList.value || !dataRegionsList.value.regions) {
    return []
  }

  const regions = dataRegionsList.value.regions
  const result = []

  Object.entries(regions).forEach(([federalDistrict, districtRegions]) => {
    result.push({
      header: federalDistrict,
      divider: true,
      disabled: true,
    })

    Object.entries(districtRegions).forEach(([regionName, regionCode]) => {
      result.push({
        value: regionCode,
        label: regionName,
      })
    })
  })

  return result
})

const { onSubmit, isSubmitting, isValid, errors } = useFormSubmit(
  initialValuesForm,
  notificationByFioSchema,
  notificationApi.notificationRequestByFio,
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
      setFieldErrors(error)
      refetchGenerateCaptcha()
    },
  }
)

// Clear API errors when form validation errors change
watch(
  () => errors.value,
  () => {
    console.log('watch errors', errors.value)
    console.log('watch fieldErrors', isValid.value)
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
