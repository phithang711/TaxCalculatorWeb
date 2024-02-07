import translationEN from '../../public/locales/en/translation.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: typeof translationEN
    }
  }
}
