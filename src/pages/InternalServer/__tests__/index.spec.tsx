import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import Page500 from '../index.tsx'

describe('Page500', () => {
  it('should render 404', () => {
    const { getByText } = render(<Page500 />)
    expect(getByText('500')).toBeInTheDocument()
    expect(getByText('Internal Server Error')).toBeInTheDocument()
  })
})
