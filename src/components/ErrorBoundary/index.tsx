import { useRouteError } from 'react-router-dom'

import ErrorType from '~/types/error'

const ErrorBoundary = () => {
  const error = useRouteError() as ErrorType

  return (
    <div>
      <h1>Error</h1>
      <p>{error.error.message}</p>
    </div>
  )
}

export default ErrorBoundary
