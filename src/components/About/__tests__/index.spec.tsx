import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import About from '../index.tsx'

describe('About', () => {
  it('should render about page', () => {
    render(<About />)
    expect(screen.getByText('about.title')).toBeInTheDocument()
    expect(screen.getByText('about.content')).toBeInTheDocument()
  })
})
