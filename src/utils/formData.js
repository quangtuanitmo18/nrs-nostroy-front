/**
 * Очищает данные формы от форматирования
 * @param {Object} formData - Данные формы
 * @returns {Object} - Очищенные данные
 */
export function cleanFormData(formData) {
  const cleanData = { ...formData }

  // Очистка СНИЛС
  if (cleanData.snils) {
    cleanData.snils = cleanData.snils.replace(/[^0-9]/g, '')
  }

  // Очистка телефона
  if (cleanData.phone) {
    cleanData.phone = cleanData.phone.replace(/[^0-9+]/g, '')
  }

  return cleanData
}
