import ErrorType from '~/types/error'

const About = () => {
  const triggerError = () => {
    throw {
      data: 'Error',
      error: new Error('Error')
    } as ErrorType
  }

  return (
    <div>
      <h1>About</h1>
      {import.meta.env.MODE !== 'production' && (
        <button className='btn btn-primary' onClick={triggerError}>
          Trigger an error
        </button>
      )}
    </div>
  )
}

export default About
