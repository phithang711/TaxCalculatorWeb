import i18n from 'i18next'

// Locale-to-Currency mapping
const language: { [key: string]: string } = {
  en: 'USD',
  vi: 'VND',
  // Add more mappings as needed
}

// Function to get the currency code based on locale
const getCurrencyCode = (locale?: string | number) => {
  return language[locale ?? 0] || 'USD' // Default to USD if locale not found
}

// Function to get separators and currency symbol
interface LocaleSettings {
  thousandSeparator?: string
  decimalSeparator?: string
  currencySymbol?: string
  currency?: string
}

const getLocaleSettings = (): LocaleSettings => {
  const locale = i18n.resolvedLanguage
  const currency = getCurrencyCode(locale)
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  })

  const parts = formatter.formatToParts(1234.56)
  const thousandSeparator = parts.find((part) => part.type === 'group')?.value
  const decimalSeparator = parts.find((part) => part.type === 'decimal')?.value
  const currencySymbol = parts.find((part) => part.type === 'currency')?.value

  return { thousandSeparator, decimalSeparator, currencySymbol, currency }
}

export { getCurrencyCode, getLocaleSettings }
