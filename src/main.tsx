import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import '~/index.scss'

import App from './components/App.tsx'
import { store } from '~/configs/store.config.ts'
import '~/configs/i18n.config.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
