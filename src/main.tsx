import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import '~/styles/index.scss'

import { DevSupport } from '@react-buddy/ide-toolbox'
import { ErrorBoundary } from 'react-error-boundary'
import App from './components/App.tsx'
import { store } from '~/configs/store.config.ts'
import { ComponentPreviews, useInitial } from '~/dev'

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
        <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
          <RouterProvider router={router} />
        </DevSupport>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
)
