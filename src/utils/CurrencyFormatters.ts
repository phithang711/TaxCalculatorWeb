import { getCurrencyCode, getLocaleSettings } from './locales'

const DefaultCurrencyFormatter = (number: string | number) => {
  const currencySymbol = getLocaleSettings().currencySymbol
  if (!number || isNaN(Number(number))) {
    return ''
  } else {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: getCurrencyCode('en'),
      currencyDisplay: 'symbol',
      // set currency symbol to the left of the number
      currencySign: 'standard',
    })
      .format(Number(number))
      .replace('$', currencySymbol ?? '')
  }
}
export { DefaultCurrencyFormatter }
