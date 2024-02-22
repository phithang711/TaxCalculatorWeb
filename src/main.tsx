import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import '~/index.scss'

import App from './components/product/App.tsx'
import { store } from '~/configs/store.config.ts'
import '~/configs/i18n.config.ts'

if (import.meta.env.MODE !== 'production') {
  console.log(import.meta.env)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
