import * as Sentry from '@sentry/react'
import {
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType
} from 'react-router-dom'
import { useEffect } from 'react'

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  Sentry.init({
    dsn: 'https://7c76828f832518879819c717d108ac5b@o4506692339433472.ingest.sentry.io/4506692341268480',
    tracePropagationTargets: ['taxcalculatorweb-sandbox.web.app'],
    integrations: [
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      }),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false
      })
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%.
    // You may want to change it to 100% while in development
    // and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session,
    // change the sample rate to 100% when sampling sessions where errors occur.
  })
}

export const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter)
