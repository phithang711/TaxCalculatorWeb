import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import NumTextField from '~/components/common/TextField/NumTextField.tsx'
import RadioGroupButton from '~/components/common/Button/RadioGroupButton.tsx'
import { Title } from '~/components/style/Theme'

enum CalculateSalaryBase {
  onGrossSalary = 'onGrossSalary',
  onBaseSalary = 'onBaseSalary'
}

const Home = () => {
  const { t } = useTranslation()

  const [totalIncomeInputVal, setTotalIncomeInputVal] = useState(0)
  const [salaryInputVal, setSalaryInputVal] = useState(0)
  const salaryChosenItems: { value: string; label: string }[] = [
    { value: CalculateSalaryBase.onGrossSalary, label: t('home.cal_on_gross_salary') },
    { value: CalculateSalaryBase.onBaseSalary, label: t('home.cal_on_base_salary') }
  ]
  const [chosenRadioValue, setChosenRadioValue] = useState<string | null>(CalculateSalaryBase.onGrossSalary)

  return (
    <div className='d-flex align-items-center justify-content-center bg-light'>
      <div className='text-center'>
        <Title>{t('home.title')}</Title>
        <p className='fs-3'>{t('home.content')}</p>
        <br></br>
        <p className='fs-3'>{t('home.gross_income_input')}</p>
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
        <p className='fs-3'>{t('home.net_income_input')}</p>
        <NumTextField
          value={salaryInputVal}
          disabled={chosenRadioValue !== CalculateSalaryBase.onBaseSalary}
          onChange={(val: string) => {
            const value = parseInt(val) || 0
            setSalaryInputVal(value)
          }}
        />
      </div>
    </div>
  )
}

export default Home
