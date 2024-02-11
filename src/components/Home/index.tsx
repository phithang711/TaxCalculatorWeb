import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import TextField from '../common/textfield'

const Home = () => {
  const { t } = useTranslation()

  const [totalIncomeInputVal, setTotalIncomeInputVal] = useState(0)

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <div className='text-center'>
        <h1 className='display-1 fw-bold'>{t('home.title')}</h1>
        <p className='fs-3'>{t('home.content')}</p>
        <br></br>
        <p className='fs-3'>{t('home.gross_income_input')}</p>
        <TextField
          value={totalIncomeInputVal}
          onChange={(val: string) => {
            console.log('value: ', val)
            const value = parseInt(val) || 0
            setTotalIncomeInputVal(value)
          }}
        />
      </div>
    </div>
  )
}

export default Home
