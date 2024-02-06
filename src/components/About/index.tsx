import { useEffect } from 'react'
import ErrorType from '~/types/error'

const About = () => {
  useEffect(() => {
    throw {
      error: new Error('About error'),
      data: 'About error'
    } as unknown as ErrorType
  }, [])

  return <div>About</div>
}

export default About
