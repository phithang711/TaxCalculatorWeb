import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Page404 from '../index.tsx'

describe('Page404', () => {
  it('should render 404', () => {
    const { getByText } = render(<Page404 />)
    expect(getByText('404')).toBeInTheDocument()
    expect(getByText('Oops! Page not found.')).toBeInTheDocument()

    const goHomeButton = getByText('Go Home')
    expect(goHomeButton).toBeInTheDocument()
    fireEvent.click(goHomeButton)
    expect(window.location.pathname).toBe('/')
  })
})
