import { InputAdornment } from '@mui/material'
import { getLocaleSettings } from '~/utils/locales'

const CurrencyInputAdornment = ({ ...props }) => {
  const { currency } = getLocaleSettings()
  return (
    <InputAdornment position='end' {...props}>
      {currency}
    </InputAdornment>
  )
}

export default CurrencyInputAdornment
