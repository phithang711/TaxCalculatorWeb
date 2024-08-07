import { configureStore } from '@reduxjs/toolkit'
import { createReduxEnhancer } from '@sentry/react'
import { api } from '~/configs/api.config.ts'

const sentryReduxEnhancer = createReduxEnhancer({
  // Optionally pass options listed below
})

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware)
  },
  enhancers: (getDefaultEnhancers) => {
    return getDefaultEnhancers().concat(sentryReduxEnhancer)
  },
  devTools: import.meta.env.MODE !== 'production',
})
