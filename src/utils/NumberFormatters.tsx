import React from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { getLocaleSettings } from './locales'

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const DefaultNumberFormatInput = React.forwardRef<NumericFormatProps, CustomProps>(
  function DefaultNumberFormat(props, ref) {
    const { onChange, ...other } = props

    const { thousandSeparator, decimalSeparator } = getLocaleSettings()

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
