import { Box, Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ROUTES from '~/utils/routes'

const Home = () => {
  const navigate = useNavigate()
  const { t } = useTranslation() // Fix the typo in the variable name

  return (
    <Grid container sx={{ height: '100vh', backgroundColor: 'background.paper', justifyContent: 'center' }}>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
          p: 4,
        }}>
        <Box>
          <h1>{t('home.title')}</h1>
        </Box>
        <Box>
          <Button variant='outlined' color='primary' onClick={() => navigate(ROUTES.TAX_CAL)}>
            {t('tax_calculator.title')}
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}
export default Home
