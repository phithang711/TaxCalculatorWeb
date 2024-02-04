import React from 'react'
import ReactDOM from 'react-dom/client'
import { DevSupport } from '@react-buddy/ide-toolbox'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import '~/styles/index.scss'

import App from './App.tsx'
import { ComponentPreviews, useInitial } from '~/dev'
import { store } from '~/configs/store.config.ts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </DevSupport>
  </React.StrictMode>
)
