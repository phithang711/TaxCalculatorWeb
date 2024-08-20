import { useState } from 'react'
import useStates from './utils/useStates'
import { Income } from '~/types/taxCal/income'
import TaxInfo from '~/types/taxCal/taxInfos'
import calculateNetIncome, { NetIncomeInfo, TaxConfig } from '~/usecases/calculateTaxUsecase'

interface useTaxCalculatorProps {
  income: Income
}

const useTaxCalculator = (
  props: useTaxCalculatorProps,
): [TaxInfo, ({ inputIncome, inputConfig }: { inputIncome?: Income; inputConfig?: TaxConfig }) => void] => {
  const { income } = props
  const [taxInfo, setTaxInfo] = useStates<TaxInfo>({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [config, _] = useState()

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

  const reUpdateTaxInfo = ({ inputIncome, inputConfig }: { inputIncome?: Income; inputConfig?: TaxConfig }) => {
    const taxInfo = calculateNetIncome({
      grossIncome: inputIncome?.['gross-income'] ?? income?.['gross-income'],
      dependents: inputIncome?.['number-of-dependents'] ?? income?.['number-of-dependents'],
      config: inputConfig ?? config,
    })
    setTaxInfo(mapToTaxInfo(taxInfo))
  }

  return [taxInfo, reUpdateTaxInfo]
}

const mapToTaxInfo = (useCaseOutput: NetIncomeInfo): TaxInfo => {
  return {
    employee: {
      netIncome: useCaseOutput.netIncome,
      insurance: {
        unemploymentInsurance: useCaseOutput?.insurance?.unemploymentInsurance,
        socialInsurance: useCaseOutput?.insurance?.socialInsurance,
        healthInsurance: useCaseOutput?.insurance?.healthInsurance,
      },
      tax: useCaseOutput.tax,
    },
  }
}

export default useTaxCalculator
