import { post } from '@/configs/http'

const GET_SPECIALISTS_URL = 'specialists'

const getSpecialists = (params = {}) => {
  return post(GET_SPECIALISTS_URL, params || {})
}
export const specialistApi = {
  getSpecialists,
}
