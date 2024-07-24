import { RouterProvider } from 'react-router-dom'
import { Suspense } from 'react'
import TaxCalculator from './pages/TaxCalculator'
import { sentryCreateBrowserRouter } from '~/configs/sentry.config.ts'

import About from '~/pages/About'
import Home from '~/pages/Home'
import Page404 from '~/pages/NotFound'
import ErrorBoundary from '~/pages/ErrorBoundary'

const router = sentryCreateBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/tax-calculator',
    element: <TaxCalculator />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/about',
    element: <About />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
])

const App = () => {
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
