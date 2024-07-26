import { Box, Button, Card, CardContent, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import React, { useContext } from 'react'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import InputPanel from '~/components/product/InputPanel/InputPanel'
import ResultPanel from '~/components/product/ResultPanel/ResultPanel'
import ToggleColorMode from '~/components/common/Button/ToggleColorMode'
import ResultPanelMobile from '~/components/product/ResultPanel/ResultPanelMobile'
import { DefaultCurrencyFormatter } from '~/utils/CurrencyFormatters'
import ROUTES from '~/utils/routes'
import { ThemeToggleContext } from '~/themeToggleContext'

const TaxCalculator = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const themeMode = useTheme().palette.mode
  const changeTheme = useContext(ThemeToggleContext)

  const toggleColorMode = () => {
    changeTheme()
  }

  const handleBack = () => {
    // Back to home and clear all history
    navigate(ROUTES.HOME, { replace: true })
  }

  const _resultDetails = {
    employee: {
      netIncome: '1234',
      insurance: {
        retirementInsur: '',
        healthInsur: '',
        deathInsur: '',
        sicknessInsur: '',
        workAccidentInsur: '',
        maternityInsur: '',
        unemploymentInsur: '',
      },
      tax: '',
    },
    company: {
      insurance: {
        retirementInsur: '',
        healthInsur: '',
        deathInsur: '',
        sicknessInsur: '',
        workAccidentInsur: '',
        maternityInsur: '',
        unemploymentInsur: '',
      },
      total: '',
    },
  }

  return (
    <Grid container sx={{ height: { xs: '100%', sm: '100dvh' } }}>
      {/* Result Panel */}
      <Grid
        item
        xs={12}
        sm={5}
        lg={4}
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          backgroundColor: 'background.paper',
          borderRight: { sm: 'none', md: '1px solid' },
          borderColor: { sm: 'none', md: 'divider' },
          alignItems: 'start',
          pt: 4,
          px: 10,
          gap: 4,
        }}>
        <Box sx={{ display: 'flex', alignItems: 'end', height: 150 }}>
          <Button startIcon={<ArrowBackRoundedIcon />} component='a' onClick={handleBack} sx={{ ml: '-8px' }}>
            {t('tax_calculator.back_to_home_btn')}
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: '100%',
            maxWidth: 500,
          }}>
          <ResultPanel {..._resultDetails} />
        </Box>
      </Grid>

      {/* Input Panel */}
      <Grid
        item
        sm={12}
        md={7}
        lg={8}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          width: '100%',
          backgroundColor: { xs: 'transparent', sm: 'background.default' },
          alignItems: 'start',
          pt: { xs: 2, sm: 4 },
          px: { xs: 2, sm: 10 },
          gap: { xs: 4, md: 8 },
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: { sm: 'space-between', md: 'flex-end' },
            alignItems: 'center',
            width: '100%',
            maxWidth: { sm: '100%', md: 600 },
          }}>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <Button startIcon={<ArrowBackRoundedIcon />} component='a' onClick={handleBack} sx={{ alignSelf: 'start' }}>
              {t('tax_calculator.back_to_home_btn')}
            </Button>

            <ToggleColorMode mode={themeMode} toggleColorMode={toggleColorMode} />
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexGrow: 1,
              height: 150,
            }}>
            <ToggleColorMode data-screenshot='toggle-mode' mode={themeMode} toggleColorMode={toggleColorMode} />
            <Typography variant='h4' color='primary' sx={{ width: '100%' }}>
              {t('tax_calculator.title')}
            </Typography>
          </Box>
        </Box>
        <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
          <CardContent
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              ':last-child': { pb: 2 },
            }}>
            <div>
              <Typography variant='subtitle2' gutterBottom>
                {t('result_panel.net_income')}
              </Typography>
              <Typography variant='body1'>{DefaultCurrencyFormatter(_resultDetails.employee.netIncome)}</Typography>
            </div>
            <ResultPanelMobile {..._resultDetails} />
          </CardContent>
        </Card>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: '100%',
            maxWidth: { sm: '100%', md: 600 },
            maxHeight: '720px',
            gap: { xs: 5, md: 'none' },
          }}>
          <React.Fragment>
            <InputPanel />
            <Box
              sx={[
                {
                  display: 'flex',
                  flexDirection: { xs: 'column-reverse', sm: 'row' },
                  alignItems: 'end',
                  flexGrow: 1,
                  gap: 1,
                  pb: { xs: 12, sm: 0 },
                  mt: { xs: 2, sm: 0 },
                  mb: '60px',
                },
                { justifyContent: 'flex-end' },
              ]}>
              <Button
                variant='contained'
                endIcon={<ChevronRightRoundedIcon />}
                onClick={() => {}}
                sx={{ width: { xs: '100%', sm: 'fit-content' } }}>
                Next
              </Button>
            </Box>
          </React.Fragment>
        </Box>
      </Grid>
    </Grid>
    // </ThemeProvider>
  )
}

export default TaxCalculator
