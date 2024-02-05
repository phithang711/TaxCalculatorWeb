import { configureStore } from '@reduxjs/toolkit'
import { createReduxEnhancer } from '@sentry/react'

const sentryReduxEnhancer = createReduxEnhancer({
  // Optionally pass options listed below
})

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
  },
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(sentryReduxEnhancer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
