export const SNILS_MASK = '###-###-### ##'

export const RUSSIAN_PHONE_MASK = '+7 (###) (###) ##-##'

export const createMaskaConfig = (mask, eager = false, reversed = false) => {
  return {
    mask,
    eager,
    reversed,
    tokens: {
      '#': { pattern: /[0-9]/ },
      X: { pattern: /[a-zA-Z]/ },
      S: { pattern: /[a-zA-Z0-9]/ },
      A: { pattern: /[a-zA-Z0-9]/ },
      '*': { pattern: /./ },
    },
  }
}

export const maskaRules = {
  snils: createMaskaConfig(SNILS_MASK),
  russianPhone: createMaskaConfig(RUSSIAN_PHONE_MASK),
}

export default maskaRules
