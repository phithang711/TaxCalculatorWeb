import { useRouteError } from 'react-router-dom'
import ErrorType from '~/types/error'
import Page500 from '~/components/product/Page500'

const ErrorBoundary = () => {
  const error = useRouteError() as ErrorType

  console.error(error)

  if (error?.status === 500) {
    return <Page500 />
  }

  return (
    <div>
      <h1>Error</h1>
      <p>{error?.data}</p>
    </div>
  )
}

export default ErrorBoundary
