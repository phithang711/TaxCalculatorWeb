import React from 'react'
import ReactDOM from 'react-dom/client'
import { DevSupport } from '@react-buddy/ide-toolbox'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './scss/styles.scss'

import App from './App.tsx'
import { ComponentPreviews, useInitial } from '~/dev'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
      <RouterProvider router={router} />
    </DevSupport>
  </React.StrictMode>
)
