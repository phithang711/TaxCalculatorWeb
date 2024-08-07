import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Home from '~/pages/Home/index.tsx'
// import i18n from '~/configs/i18n.config'

describe('Home ne du di me may', () => {
  test('should render about page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByText('home.title')).toBeInTheDocument()
    expect(screen.getByText('tax_calculator.title')).toBeInTheDocument()
  })
})
