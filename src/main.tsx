import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import '~/index.scss'

import App from './components/App.tsx'
import ErrorBoundary from '~/components/ErrorBoundary'
import { store } from '~/configs/store.config.ts'
import About from '~/components/About'
import { sentryCreateBrowserRouter } from '~/configs/sentry.config.ts'

const router = sentryCreateBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/about',
    element: <About />,
    errorElement: <ErrorBoundary />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
