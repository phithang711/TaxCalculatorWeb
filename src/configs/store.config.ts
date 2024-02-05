import { configureStore } from '@reduxjs/toolkit'
import { createReduxEnhancer } from '@sentry/react'

const sentryReduxEnhancer = createReduxEnhancer({
  // Optionally pass options listed below
})

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
  },
  enhancers: (getDefaultEnhancers) => {
    return getDefaultEnhancers().concat(sentryReduxEnhancer)
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
