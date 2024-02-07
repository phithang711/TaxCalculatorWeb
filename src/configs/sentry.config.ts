import * as Sentry from '@sentry/react'
import { createBrowserRouter } from 'react-router-dom'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://7c76828f832518879819c717d108ac5b@o4506692339433472.ingest.sentry.io/4506692341268480',
    integrations: [
      new Sentry.BrowserTracing({
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: [/^https:\/\/yourserver\.io\/api/]
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
