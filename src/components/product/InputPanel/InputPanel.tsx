import { FormLabel, Grid, OutlinedInput, styled, TextField, Tooltip } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { t } from 'i18next'
import { useState } from 'react'
import { ECO_REGIONS } from '~/constants'
import { DefaultNumberFormatInput } from '~/utils/NumberFormatters'
import CurrencyInputAdornment from '~/components/common/CurrencyInputAdornment/CurrencyInputAdornment'
import { Income } from '~/types/taxCal/income'

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

const FormLabelWithTooltip = styled(FormLabel)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}))

type ChangesHandler = (newValue: Income) => void
interface InputPanelProps {
  onChange?: ChangesHandler
}

const InputPanel = (props: InputPanelProps) => {
  const { onChange } = props
  const [income, setIncome] = useState<Income>({})

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    //TODO: please recheck this line. Should we use useEffect to call onChange here?
    const updateIncome = { ...income, [name]: value }
    setIncome(updateIncome)
    onChange?.(updateIncome)
  }

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12}>
        <FormLabelWithTooltip htmlFor='gross-income'>
          {t('input_panel.gross_income')}
          <Tooltip title='tooltip ne'>
            <InfoIcon />
          </Tooltip>
        </FormLabelWithTooltip>
        <OutlinedInput
          id='gross-income'
          name='gross-income'
          placeholder='0'
          endAdornment={<CurrencyInputAdornment />}
          inputComponent={DefaultNumberFormatInput as never}
          onChange={handleInputChange}
          value={income?.['gross-income'] ?? ''}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabelWithTooltip htmlFor='income-insurance'>
          {t('input_panel.income_insurance')}
          <Tooltip title='tooltip ne'>
            <InfoIcon />
          </Tooltip>
        </FormLabelWithTooltip>
        <OutlinedInput
          id='income-insurance'
          name='income-insurance'
          placeholder='0'
          endAdornment={<CurrencyInputAdornment />}
          inputComponent={DefaultNumberFormatInput as never}
          onChange={handleInputChange}
          value={income?.['income-insurance'] ?? ''}
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor='eco-region' required>
          {t('input_panel.eco_region')}
        </FormLabel>
        <TextField
          id='eco-region'
          name='eco-region'
          select
          onChange={handleInputChange}
          value={income?.['eco-region']}
          SelectProps={{
            native: true,
          }}>
          {ECO_REGIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {t(option.label) + ' ' + option.value}
            </option>
          ))}
        </TextField>
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor=''>{t('input_panel.number_of_dependents')}</FormLabel>
        <OutlinedInput
          id='number-of-dependents'
          name='number-of-dependents'
          type='number'
          placeholder='0'
          onChange={handleInputChange}
          value={income?.['number-of-dependents'] ?? 0}
        />
      </FormGrid>
    </Grid>
  )
}
export default InputPanel
