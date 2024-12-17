import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className='display-5 fw-bold'>{t('about.title')}</h1>
      <p className='lead'>{t('about.content')}</p>
    </div>
  )
}

export default About
