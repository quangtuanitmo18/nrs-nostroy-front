import { post } from '@/configs/http'

export const notificationService = {
  /**
   * Отправка запроса на уведомление
   * @param {Object} data - Данные формы
   * @returns {Promise}
   */
  submitNotification: async data => {
    return post('/api/notifications', data)
  },

  // /**
  //  * Получение новой капчи
  //  * @returns {Promise}
  //  */
  // getCaptcha: async () => {
  //   return get('/api/captcha')
  // },
}
