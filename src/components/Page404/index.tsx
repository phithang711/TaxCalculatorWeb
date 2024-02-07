import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <div className='d-flex align-items-center justify-content-center'>
      <div className='text-center'>
        <h1 className='display-1 fw-bold'>404</h1>
        <p className='fs-3'>Oops! Page not found.</p>
        <p className='lead'>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link className='btn btn-primary' to='/'>
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default Page404
