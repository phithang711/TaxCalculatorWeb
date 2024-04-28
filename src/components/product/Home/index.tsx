import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import NumTextField from '~/components/common/TextField/NumTextField.tsx'
import RadioGroupButton from '~/components/common/Button/RadioGroupButton.tsx'
import { Title, DefaultText, Page } from '~/components/style/Theme'

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
    <Page>
      <div className='text-center'>
        <Title>{t('home.title')}</Title>
        <DefaultText>{t('home.content')}</DefaultText>
        <br></br>
        <DefaultText>{t('home.gross_income_input')}</DefaultText>
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
        <DefaultText>{t('home.net_income_input')}</DefaultText>
        <NumTextField
          value={salaryInputVal}
          disabled={chosenRadioValue !== CalculateSalaryBase.onBaseSalary}
          onChange={(val: string) => {
            const value = parseInt(val) || 0
            setSalaryInputVal(value)
          }}
        />
      </div>
    </Page>
  )
}

export default Home
