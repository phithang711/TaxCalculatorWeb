import { useRouteError } from 'react-router-dom'

import ErrorType from '~/types/error'
import Page404 from '~/components/ErrorBoundary/Page404'
import Page500 from '~/components/ErrorBoundary/Page500/Page500.tsx'

const ErrorBoundary = () => {
  const error = useRouteError() as ErrorType

  switch (error?.status) {
    case 404:
      return <Page404 />
    case 500:
      return <Page500 />
  }

  return (
    <div>
      <h1>Error</h1>
      <p>{error.error.message}</p>
    </div>
  )
}

export default ErrorBoundary
