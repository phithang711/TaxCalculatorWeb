import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import NumTextField from '../common/NumTextField'
import RadioGroupButton from '../common/RadioGroupButton'

const Home = () => {
  const { t } = useTranslation()

  const [totalIncomeInputVal, setTotalIncomeInputVal] = useState(0)
  const [salaryInputVal, setSalaryInputVal] = useState(0)
  const salaryChosenItems: { value: string; label: string }[] = [
    { value: 'onGrossSalary', label: t('home.cal_on_gross_salary') },
    { value: 'onBaseSalary', label: t('home.caln_base_salary') }
  ]
  const [chosenRadioValue, setChosenRadioValue] = useState<string | null>(null)

  return (
    <div className='d-flex align-items-center justify-content-center bg-light'>
      <div className='text-center'>
        <h1 className='display-1 fw-bold'>{t('home.title')}</h1>
        <p className='fs-3'>{t('home.content')}</p>
        <br></br>
        <p className='fs-3'>{t('home.gross_income_input')}</p>
        <NumTextField
          value={totalIncomeInputVal}
          onChange={(val: string) => {
            console.log('value: ', val)
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
        <>
          {salaryChosenItems.map((item) => {
            <div key={item.value}>
              <input
                name='test'
                type='radio'
                value={item.value}
                id={item.value}
                checked={chosenRadioValue === item.value}
                onChange={(e) => setChosenRadioValue(e.target.value)}
              />{' '}
              <label htmlFor={item.value}>{item.label}</label>
            </div>
          })}
        </>
        <input type='radio' name='test1' value={salaryChosenItems[0].value} id={salaryChosenItems[0].value} />{' '}
        <label htmlFor={salaryChosenItems[0].value}>{salaryChosenItems[0].label}</label>
        <br></br>
        <p className='fs-3'>{t('home.net_income_input')}</p>
        <NumTextField
          value={salaryInputVal}
          onChange={(val: string) => {
            console.log('value: ', val)
            const value = parseInt(val) || 0
            setSalaryInputVal(value)
          }}
        />
      </div>
    </div>
  )
}

export default Home
