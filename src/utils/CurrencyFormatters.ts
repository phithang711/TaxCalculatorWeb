import i18n from 'i18next'
import { getCurrencyCode } from './locales'

const DefaultCurrencyFormatter = (number?: string | number) => {
  const locale = i18n.language
  if (!number || isNaN(Number(number))) {
    return ''
  } else {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: getCurrencyCode(locale),
    }).format(Number(number))
  }
}

export { DefaultCurrencyFormatter }
