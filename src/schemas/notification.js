/* eslint-disable no-useless-escape */
import { object, string } from 'yup'
import { emailRule, phonenumberRussianRule } from './common'

export const notificationBySnilsSchema = object({
  snils: string()
    .required('СНИЛС обязателен для заполнения')
    .matches(/^\d{3}-\d{3}-\d{3} \d{2}$/, 'СНИЛС должен быть в формате XXX-XXX-XXX XX'),
  email: emailRule,
  phone: phonenumberRussianRule,
  captchaCode: string()
    .required('Код с картинки обязателен для заполнения')
    .min(6, 'Код должен содержать 6 символов'),
})

export const notificationByFioSchema = object({
  region: string().required('Регион обязателен для заполнения'),
  fio: string()
    .required('ФИО обязательно для заполнения')
    .min(5, 'ФИО должно содержать минимум 5 символов')
    .matches(/^[а-яА-ЯёЁ\s\-]+$/, 'ФИО может содержать только русские буквы, тире и знак пробела'),
  birthdate: string()
    .required('Дата рождения обязательна для заполнения')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Неверный формат даты'),
  email: emailRule,
  phone: phonenumberRussianRule,
  captchaCode: string()
    .required('Код с картинки обязателен для заполнения')
    .min(6, 'Код должен содержать 6 символов'),
})
