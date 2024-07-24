import {
  Box,
  Button,
  Card,
  CardContent,
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import React from 'react'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { useTranslation } from 'react-i18next'
import InputPanel from '~/components/product/InputPanel/InputPanel'
import ResultPanel from '~/components/product/ResultPanel/ResultPanel'
import getTheme from '~/getTheme'
import SitemarkIcon from '~/assets/svg/SitemarkIcon'
import ToggleColorMode from '~/components/common/Button/ToggleColorMode'

const Home = () => {
  const [mode, setMode] = React.useState<PaletteMode>('light')
  const theme = createTheme(getTheme(mode))
  const { t } = useTranslation()

  const [activeStep, setActiveStep] = React.useState(0)

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{ height: { xs: '100%', sm: '100dvh' } }}>
        {/* The largest column to wrap all the content
        <Grid item xs={12} sm={12} lg={12} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

        </Grid> */}
        {/* 1st column */}
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
            <Button
              startIcon={<ArrowBackRoundedIcon />}
              component='a'
              href='/material-ui/getting-started/templates/'
              sx={{ ml: '-8px' }}>
              Back to
              <SitemarkIcon />
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
            <ResultPanel
              employee={{
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
              }}
              company={{
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
              }}
            />
          </Box>
        </Grid>

        {/* 2nd column */}
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
              <Button
                startIcon={<ArrowBackRoundedIcon />}
                component='a'
                href='/material-ui/getting-started/templates/'
                sx={{ alignSelf: 'start' }}>
                Back to
                <SitemarkIcon />
              </Button>

              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
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
              <ToggleColorMode data-screenshot='toggle-mode' mode={mode} toggleColorMode={toggleColorMode} />
              <Typography variant='h4' color='primary' sx={{ width: '100%' }}>
                {t('home.title')}
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
                  Selected products
                </Typography>
                <Typography variant='body1'>{activeStep >= 2 ? '$144.97' : '$134.98'}</Typography>
              </div>
              <InputPanel />
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
                  onClick={handleNext}
                  sx={{ width: { xs: '100%', sm: 'fit-content' } }}>
                  Next
                </Button>
              </Box>
            </React.Fragment>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Home
