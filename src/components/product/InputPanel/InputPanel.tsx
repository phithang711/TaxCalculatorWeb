import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import RadioGroupButton from '~/components/common/Button/RadioGroupButton'
import NumTextField from '~/components/common/TextField/NumTextField'

enum CalculateSalaryBase {
  onGrossSalary = 'onGrossSalary',
  onBaseSalary = 'onBaseSalary'
}

const InputPanel = () => {
  const { t } = useTranslation()

  const [totalIncomeInputVal, setTotalIncomeInputVal] = useState(0)
  const [salaryInputVal, setSalaryInputVal] = useState(0)
  const salaryChosenItems: { value: string; label: string }[] = [
    { value: CalculateSalaryBase.onGrossSalary, label: t('home.cal_on_gross_salary') },
    { value: CalculateSalaryBase.onBaseSalary, label: t('home.cal_on_base_salary') }
  ]
  const [chosenRadioValue, setChosenRadioValue] = useState<string | null>(CalculateSalaryBase.onGrossSalary)

  return (
    <Box
      bgcolor={'lightgrey'}
      sx={{
        padding: 5
      }}>
      <Typography variant='h1' color='primary'>
        {t('home.title')}
      </Typography>
      <Typography variant='body2'>{t('home.content')}</Typography>
      <br></br>
      <Typography variant='body2'>{t('home.gross_income_input')}</Typography>
      <NumTextField
        value={totalIncomeInputVal}
        onChange={(val: string) => {
          const value = parseInt(val) || 0
          setTotalIncomeInputVal(value)
        }}
      />
      <br></br>
      <RadioGroupButton
        name='salaryChosen'
        items={salaryChosenItems}
        value={chosenRadioValue}
        onChange={setChosenRadioValue}
      />
      <br></br>
      <Typography variant='body2'>{t('home.net_income_input')}</Typography>
      <NumTextField
        value={salaryInputVal}
        disabled={chosenRadioValue !== CalculateSalaryBase.onBaseSalary}
        onChange={(val: string) => {
          const value = parseInt(val) || 0
          setSalaryInputVal(value)
        }}
      />
    </Box>
  )
}
export default InputPanel
