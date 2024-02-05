import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import '~/styles/index.scss'

import { ErrorBoundary } from 'react-error-boundary'
import App from './components/App.tsx'
import { store } from '~/configs/store.config.ts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
)
