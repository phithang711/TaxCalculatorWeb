import { RouterProvider } from 'react-router-dom'
import { Suspense, useMemo, useState } from 'react'
import { CssBaseline, PaletteMode, ThemeProvider, createTheme } from '@mui/material'
import TaxCalculator from './pages/TaxCalculator'
import getTheme from './getTheme'
import ROUTES from './utils/routes'
import { ThemeToggleContext } from './themeToggleContext'
import { sentryCreateBrowserRouter } from '~/configs/sentry.config.ts'

import About from '~/pages/About'
import Home from '~/pages/Home'
import Page404 from '~/pages/NotFound'
import ErrorBoundary from '~/pages/ErrorBoundary'

const router = sentryCreateBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: ROUTES.TAX_CAL,
    element: <TaxCalculator />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: ROUTES.ABOUT,
    element: <About />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
])

const App = () => {
  const [mode, setMode] = useState<PaletteMode>((localStorage.getItem('theme') as PaletteMode) || 'light')
  const theme = createTheme(getTheme(mode))

  const toggleColorMode = useMemo(() => {
    return () => {
      setMode((prevMode) => {
        const newMode = prevMode === 'light' ? 'dark' : 'light'
        localStorage.setItem('theme', newMode)
        return newMode
      })
    }
  }, [])

  return (
    <Suspense>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeToggleContext.Provider value={toggleColorMode}>
          <RouterProvider router={router} />
        </ThemeToggleContext.Provider>
      </ThemeProvider>
    </Suspense>
  )
}

export default App
