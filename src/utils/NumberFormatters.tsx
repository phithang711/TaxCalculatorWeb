import React from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import i18n from 'i18next'

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

// Function to get separators based on locale
const getLocaleSeparators = (locale: string): { thousandSeparator: string; decimalSeparator: string } => {
  const formatter = new Intl.NumberFormat(locale)
  const parts = formatter.formatToParts(1234.56)

  const thousandSeparator = parts.find((part) => part.type === 'group')!.value
  const decimalSeparator = parts.find((part) => part.type === 'decimal')!.value

  return { thousandSeparator, decimalSeparator }
}

const DefaultNumberFormatInput = React.forwardRef<NumericFormatProps, CustomProps>(
  function DefaultNumberFormat(props, ref) {
    const { onChange, ...other } = props

    const { thousandSeparator, decimalSeparator } = getLocaleSeparators(i18n.language)

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          })
        }}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        allowNegative={false}
        valueIsNumericString
      />
    )
  },
)

export { DefaultNumberFormatInput }
