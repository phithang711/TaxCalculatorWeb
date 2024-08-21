import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TaxCalculator from '../index'
import '@testing-library/jest-dom'

describe('TaxCalculator page', () => {
  // jest.mock('react-animated-counter', () => ({
  //   AnimatedCounter: ({ value }: { value: number }) => <p>{value}</p>,
  // }))

  test('renders TaxCalculator page correctly', () => {
    render(
      <MemoryRouter initialEntries={['/tax-calculator']}>
        <TaxCalculator />
      </MemoryRouter>,
    )

    // Assert that the page renders correctly
    const pageTitle = screen.getByText('tax_calculator.title')
    expect(pageTitle).toBeInTheDocument()
    // Add more assertions as needed
  })
})
