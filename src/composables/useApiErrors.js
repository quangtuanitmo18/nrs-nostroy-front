import { isObject } from 'lodash'
import { ref, computed } from 'vue'

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

    // Nếu không có response, không làm gì cả
    if (!errorResponse) return

    // Lấy data từ error response
    const responseData = errorResponse

    // Trường hợp 1: Lỗi validation với validationErrors
    if (responseData.data?.validationErrors) {
      const validationErrors = responseData.data.validationErrors

      // Xử lý các lỗi validation field
      Object.entries(validationErrors).forEach(([field, errors]) => {
        if (Array.isArray(errors) && errors.length > 0) {
          fieldErrors.value[errors[0].label] = errors[0].message
        } else if (isObject(errors) && errors.label && errors.message) {
          fieldErrors.value[errors.label] = errors.message
        } else if (typeof errors === 'string') {
          fieldErrors.value[field] = errors
        }
      })

      // Nếu có message chung, lưu lại
      if (responseData.message) {
        generalError.value = responseData.message
      }
    }
    // Trường hợp 2: Lỗi exception hoặc lỗi general
    else if (responseData.message) {
      generalError.value = responseData.message
    }
    // Trường hợp khác: Lỗi không xác định
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
