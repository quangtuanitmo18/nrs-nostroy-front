import { object, string } from 'yup'
import { emailRule, phonenumberRussianRule } from './common'

export const notificationBySnilsSchema = object({
  snils: string()
    .required('СНИЛС обязателен для заполнения')
    .matches(/^\d{3}-\d{3}-\d{3} \d{2}$/, 'СНИЛС должен быть в формате XXX-XXX-XXX XX'),
  email: emailRule,
  phone: phonenumberRussianRule,
  // captcha: string().required('Код с картинки обязателен для заполнения'),
})

export const notificationByNameSchema = object({
  region: string().required('Регион обязателен для заполнения'),
  fullName: string()
    .required('ФИО обязательно для заполнения')
    .min(5, 'ФИО должно содержать минимум 5 символов'),
  birthDate: string()
    .required('Дата рождения обязательна для заполнения')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Неверный формат даты'),
  email: emailRule,
  phone: phonenumberRussianRule,
  // captcha: string().required('Код с картинки обязателен для заполнения'),
})
