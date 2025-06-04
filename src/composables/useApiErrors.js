import { ref } from 'vue'

export function useApiErrors() {
  const fieldErrors = ref({})

  const setFieldErrors = errorResponse => {
    fieldErrors.value = {}

    if (errorResponse?.response?.data?.errors) {
      const errors = errorResponse.response.data.errors

      // Преобразование ошибок API в формат для полей формы
      Object.entries(errors).forEach(([field, messages]) => {
        fieldErrors.value[field] = Array.isArray(messages) ? messages[0] : messages
      })
    }
  }

  const clearFieldErrors = () => {
    fieldErrors.value = {}
  }

  return {
    fieldErrors,
    setFieldErrors,
    clearFieldErrors,
  }
}
