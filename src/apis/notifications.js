import { get, post, put } from '@/configs/http'

const GET_REGIONS_LIST = 'notification-request/get-regions-list'
const GENERATE_CAPTCHA = 'notification-request/generate-captcha'
const NOTIFICATION_REQUEST_BY_SNILS = 'notification-request/by-snils'
const NOTIFICATION_REQUEST_BY_FIO = 'notification-request/by-fio'

const getRegionsList = (params = {}) => {
  return post(GET_REGIONS_LIST, params || {})
}

const generateCaptcha = () => {
  return get(GENERATE_CAPTCHA)
}
const notificationRequestBySnils = (data = {}) => {
  return put(NOTIFICATION_REQUEST_BY_SNILS, data || {})
}

const notificationRequestByFio = (data = {}) => {
  return put(NOTIFICATION_REQUEST_BY_FIO, data || {})
}

export const notificationApi = {
  getRegionsList,
  generateCaptcha,
  notificationRequestBySnils,
  notificationRequestByFio,
}
