import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation()

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <div className='text-center'>
        <h1 className='display-1 fw-bold'>Home</h1>
        <p className='fs-3'>{t('home.hello')}</p>
      </div>
    </div>
  )
}

export default Home
