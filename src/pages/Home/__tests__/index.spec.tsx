import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../index.tsx'

describe('Home', () => {
  it('should render about page', () => {
    render(<Home />)
    expect(screen.getByText('home.title')).toBeInTheDocument()
    expect(screen.getByText('home.content')).toBeInTheDocument()
  })
})
