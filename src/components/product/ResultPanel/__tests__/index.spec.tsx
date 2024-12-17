import { render } from '@testing-library/react'
import ResultPanel from '../ResultPanel'
import TaxInfo from '~/types/taxCal/taxInfos'

test('renders ResultPanel correctly', () => {
  const props: TaxInfo = {
    employee: {
      netIncome: 100000,
      insurance: {
        unemploymentInsurance: 1000,
        socialInsurance: 2000,
        healthInsurance: 3000,
      },
      tax: 10000,
    },
  }

  render(<ResultPanel {...props} />)
})
