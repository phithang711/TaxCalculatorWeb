import { FormLabel, Grid, OutlinedInput, styled, TextField, Tooltip } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { t } from 'i18next'
import { ECO_REGIONS } from '~/constants'
import { DefaultNumberFormatInput } from '~/utils/NumberFormatters'
import CurrencyInputAdornment from '~/components/common/CurrencyInputAdornment/CurrencyInputAdornment'

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

const FormLabelWithTooltip = styled(FormLabel)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}))

const InputPanel = () => {
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
          required
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
          required
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
          defaultValue={0}
        />
      </FormGrid>
    </Grid>
  )
}
export default InputPanel
