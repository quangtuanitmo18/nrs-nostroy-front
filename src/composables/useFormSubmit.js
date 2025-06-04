import { useMutation } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import { markRaw, ref } from 'vue'

export function useFormSubmit(initialValues, schema, submitFn, options = {}) {
  const { onSuccess, onError, resetAfterSubmit = true } = options

  const isSubmitting = ref(false)
  const submitError = ref(null)
  const isSuccess = ref(false)

  // Sử dụng markRaw để tránh Vue reactive conversion cho schema
  const validationSchema = markRaw(schema)

  // Setup form với Yup schema
  const { handleSubmit, resetForm, values, errors, meta, validate } = useForm({
    validationSchema,
    validateOnMount: false, // Không validate khi mount
    validateOnBlur: true, // Validate khi blur
    validateOnChange: true, // Validate khi change (QUAN TRỌNG)
    validateOnInput: false, // Không validate khi typing (tránh làm phiền user)
    initialValues: initialValues,
  })

  // Setup mutation
  const mutation = useMutation({
    mutationFn: submitFn,
    onSuccess: data => {
      isSuccess.value = true
      submitError.value = null

      if (resetAfterSubmit) {
        resetForm()
      }

      if (onSuccess) {
        onSuccess(data)
      }
    },
    onError: error => {
      isSuccess.value = false
      submitError.value = error?.response?.data?.message || 'Произошла ошибка при отправке формы'

      if (onError) {
        onError(error)
      }
    },
    onSettled: () => {
      isSubmitting.value = false
    },
  })

  // Submit handler
  const onSubmit = handleSubmit(async formValues => {
    isSubmitting.value = true
    isSuccess.value = false
    submitError.value = null

    // Validate toàn bộ form trước khi submit
    const { valid } = await validate()
    if (!valid) {
      isSubmitting.value = false
      return
    }

    await mutation.mutateAsync(formValues)
  })

  return {
    onSubmit,
    resetForm,
    values,
    errors,
    isSubmitting,
    isSuccess,
    submitError,
    isValid: meta.valid,
    isDirty: meta.dirty,
    validate, // Export validate function
  }
}
