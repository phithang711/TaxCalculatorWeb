import { useEffect, useState } from 'react'
import ErrorType from '~/types/error'

const About = () => {
  const [isTriggered, setIsTriggered] = useState(false)

  const triggerError = () => {
    setIsTriggered(true)
  }

  useEffect(() => {
    if (isTriggered) {
      throw {
        data: 'Error',
        error: new Error('Error')
      } as ErrorType
    }
  }, [isTriggered])

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
