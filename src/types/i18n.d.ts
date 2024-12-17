import translationEN from '../../public/locales/en/translation.json'
import translationVI from '../../public/locales/vi/translation.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      en: typeof translationEN
      vi: typeof translationVI
    }
  }
}
