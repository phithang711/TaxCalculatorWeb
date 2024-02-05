import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import App from '../components/App.tsx'

test('Renders the main page', () => {
  render(<App />)
  expect(true).toBeTruthy()
})
