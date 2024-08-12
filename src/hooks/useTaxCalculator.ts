import { useEffect } from 'react'
import useStates from './utils/useStates'
import { Income } from '~/types/taxCal/income'
import TaxInfo from '~/types/taxCal/taxInfos'
import calculateTaxInfo, { CalculationConfig, TaxCalOutputProps } from '~/usecases/calculateTaxUsecase'

interface useTaxCalculatorProps {
  income: Income
}

const useTaxCalculator = (props: useTaxCalculatorProps): TaxInfo => {
  const { income } = props
  const [taxInfo, setTaxInfo] = useStates<TaxInfo>({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [config, setConfig] = useStates<CalculationConfig>({})

  //TODO: Turn it on when the API is ready
  // useEffect(
  //   () => {
  //     // Fetch data from API
  //     // const config = await fetchTaxCalConfig()
  //     setConfig(config)
  //   },
  //   [
  //     //TODO setup dependencies following to make config fetch work when needed
  //   ],
  // )

  useEffect(() => {
    const taxInfo = calculateTaxInfo({
      ...income,
      config,
    })
    setTaxInfo(mapToTaxInfo(taxInfo))
  }, [income, config, setTaxInfo])

  return taxInfo
}

const mapToTaxInfo = (useCaseOutput: TaxCalOutputProps): TaxInfo => {
  return {
    employee: {
      netIncome: useCaseOutput.totalNetIncome,
      insurance: {
        retirementInsur: Number(useCaseOutput.totalInsurance),
        healthInsur: 0,
        deathInsur: 0,
        sicknessInsur: 0,
        workAccidentInsur: 0,
        maternityInsur: 0,
        unemploymentInsur: 0,
      },
      tax: Number(useCaseOutput.totalTax),
    },
    company: {
      insurance: {
        retirementInsur: 0,
        healthInsur: 0,
        deathInsur: 0,
        sicknessInsur: 0,
        workAccidentInsur: 0,
        maternityInsur: 0,
        unemploymentInsur: 0,
      },
      total: 0,
    },
  }
}

export default useTaxCalculator
