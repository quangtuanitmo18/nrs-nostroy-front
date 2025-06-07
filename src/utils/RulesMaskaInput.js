const SNILS_MASK = '###-###-### ##'

const RUSSIAN_PHONE_MASK = '+7 (###) (###) ##-##'

const CAPTCHA_CODE_MASK = 'SSSSSS'

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
  captchaCode: createMaskaConfig(CAPTCHA_CODE_MASK),
}

export default maskaRules
