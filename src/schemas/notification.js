import { isValid, parseISO } from 'date-fns'
import { object, string } from 'yup'

export const notificationBySnilsSchema = object({
  snils: string()
    .required('СНИЛС обязателен для заполнения')
    .matches(/^\d{3}-\d{3}-\d{3} \d{2}$/, 'СНИЛС должен быть в формате XXX-XXX-XXX XX'),
  email: string()
    .required('Email обязателен для заполнения')
    .email('Введите корректный email адрес'),
  phone: string().optional(),
  // captcha: string().required('Код с картинки обязателен для заполнения'),
})

export const notificationByNameSchema = object({
  region: string().required('Регион обязателен для заполнения'),
  fullName: string()
    .required('ФИО обязательно для заполнения')
    .min(5, 'ФИО должно содержать минимум 5 символов'),
  birthDate: string()
    .required('Дата рождения обязательна для заполнения')
    .test('valid-date', 'Неверный формат даты', function (value) {
      if (!value) return true
      return isValid(parseISO(value))
    })
    .test('not-future', 'Дата не может быть в будущем', function (value) {
      if (!value) return true
      const date = parseISO(value)
      const today = new Date()
      return date <= today
    }),
  email: string()
    .required('Email обязателен для заполнения')
    .email('Введите корректный email адрес'),
  phone: string().optional(),
  // captcha: string().required('Код с картинки обязателен для заполнения'),
})
