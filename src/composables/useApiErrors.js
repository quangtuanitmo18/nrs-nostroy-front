import isObject from 'lodash/isObject'
import { computed, ref } from 'vue'

export function useApiErrors() {
  const fieldErrors = ref({})
  const generalError = ref('')
  const hasErrors = computed(
    () => Object.keys(fieldErrors.value).length > 0 || !!generalError.value
  )

  const setFieldErrors = errorResponse => {
    // Reset errors
    fieldErrors.value = {}
    generalError.value = ''

    if (!errorResponse) return

    // get data from error response
    const responseData = errorResponse

    // 1:  validationErrors
    if (responseData.data?.validationErrors) {
      const validationErrors = responseData.data.validationErrors

      // Handle field validation errors
      Object.entries(validationErrors).forEach(([field, errors]) => {
        if (Array.isArray(errors) && errors.length > 0) {
          fieldErrors.value[errors[0].label] = errors[0].message
        } else if (isObject(errors) && errors.label && errors.message) {
          fieldErrors.value[errors.label] = errors.message
        } else if (typeof errors === 'string') {
          fieldErrors.value[field] = errors
        }
      })

      // Handle general validation error
      if (responseData.message) {
        generalError.value = responseData.message
      }
    }
    // 2:  exception or general error
    else if (responseData.message) {
      generalError.value = responseData.message
    }
    //: error unknown
    else {
      generalError.value = 'Произошла ошибка при отправке формы'
    }
  }

  const clearFieldErrors = () => {
    fieldErrors.value = {}
    generalError.value = ''
  }

  return {
    fieldErrors,
    generalError,
    hasErrors,
    setFieldErrors,
    clearFieldErrors,
  }
}
