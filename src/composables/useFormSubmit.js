/* eslint-disable no-unused-vars */
import { useMutation } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import { computed, markRaw, ref } from 'vue'

export function useFormSubmit(initialValues, schema, submitFn, options = {}) {
  const { onSuccess, onError, resetAfterSubmit = true, extraData = {} } = options

  const isSubmitting = ref(false)
  const submitError = ref(null)
  const isSuccess = ref(false)
  const formValid = ref(false) // Добавляем ref для отслеживания валидности

  // Используем markRaw для схемы валидации
  const validationSchema = markRaw(schema)

  // Настройка формы с Yup schema
  const { handleSubmit, resetForm, values, errors, meta, validate } = useForm({
    validationSchema,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues: initialValues,
  })

  // Полностью переработанная логика определения валидности формы
  const isValid = computed(() => {
    // 1. Проверяем наличие ошибок
    const hasErrors = Object.keys(errors.value).length > 0
    if (hasErrors) {
      return false
    }

    // 2. Проверяем, что форма была заполнена (хотя бы одно поле)
    const hasValues = Object.values(values).some(value => {
      if (Array.isArray(value)) {
        return value.length > 0
      }
      return value !== null && value !== undefined && value !== ''
    })

    // 3. Возвращаем true, если форма заполнена и нет ошибок
    // Для форм без обязательных полей, просто проверяем meta.valid
    return hasValues || meta.valid === true || formValid.value
  })

  // Setup mutation
  const mutation = useMutation({
    mutationFn: submitFn,
    onSuccess: (data, variables) => {
      isSuccess.value = true
      submitError.value = null

      if (resetAfterSubmit) {
        resetForm()
      }

      if (onSuccess) {
        onSuccess(data)
      }
    },
    onError: (error, variables) => {
      isSuccess.value = false
      submitError.value = error

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

    // Выполняем валидацию всей формы перед отправкой
    const { valid } = await validate()
    formValid.value = valid // Сохраняем результат явной валидации

    if (!valid) {
      isSubmitting.value = false
      return
    }
    const extraDataValue = typeof extraData === 'function' ? extraData() : extraData

    await mutation.mutateAsync({ ...formValues, ...extraDataValue })
  })

  // Добавляем функцию для принудительной валидации и обновления состояния
  const validateForm = async () => {
    const { valid } = await validate()
    formValid.value = valid
    return valid
  }

  // Вызываем валидацию при инициализации
  validateForm()

  return {
    onSubmit,
    resetForm,
    values,
    errors,
    isSubmitting,
    isSuccess,
    submitError,
    isValid,
    isDirty: computed(() => meta.dirty),
    validate: validateForm, // Возвращаем нашу обертку над validate
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
  }
}
