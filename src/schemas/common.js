import { string } from 'yup'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const emailRule = string()
  .required('Email обязателен для заполнения')
  .email('Введите корректный email адрес')
  .matches(EMAIL_REGEX, 'Введите корректный email адрес')
  .min(6, 'Email должен содержать минимум 6 символов')
  .max(100, 'Email не может превышать 100 символов')
  .test('no-cyrillic', 'Email не может содержать кириллицу', value => {
    return value ? !/[а-яА-ЯёЁ]/.test(value) : true
  })
  .transform(value => value?.trim().toLowerCase())

const phonenumberRussianRule = string()
  .optional()
  .matches(
    /^\+7 \(\d{3}\) \(\d{3}\) \d{2}-\d{2}$/,
    'Телефон должен быть в формате +7 (XXX) (XXX) XX-XX'
  )

export { emailRule, phonenumberRussianRule }
