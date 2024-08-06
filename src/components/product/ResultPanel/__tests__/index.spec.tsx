import { render } from '@testing-library/react'
import ResultPanel from '../ResultPanel'

test('renders ResultPanel correctly', () => {
  const props = {
    employee: {
      netIncome: '1000',
      insurance: {
        sicknessInsur: '100',
        workAccidentInsur: '200',
        maternityInsur: '300',
        unemploymentInsur: '400',
        retirementInsur: '500',
        healthInsur: '600',
        deathInsur: '700',
      },
      tax: '200',
    },
    company: {
      insurance: {
        sicknessInsur: '100',
        workAccidentInsur: '200',
        maternityInsur: '300',
        unemploymentInsur: '400',
        retirementInsur: '500',
        healthInsur: '600',
        deathInsur: '700',
      },
      total: '1200',
    },
  }

  render(<ResultPanel {...props} />)
})
