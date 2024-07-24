import { t } from 'i18next'
const Home = () => {
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.content')}</p>
    </div>
  )
}
export default Home
