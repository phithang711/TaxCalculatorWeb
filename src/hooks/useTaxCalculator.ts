import { useEffect } from 'react'
import useStates from './utils/useStates'
import { Income } from '~/types/taxCal/income'
import TaxInfo from '~/types/taxCal/taxInfos'
import calculateTaxInfo, { CalculationConfig } from '~/usecases/calculateTaxUsecase'

interface useTaxCalculatorProps {
  income: Income
}

const useTaxCalculator = (props: useTaxCalculatorProps): TaxInfo => {
  const { income } = props
  const [taxInfo, setTaxInfo] = useStates<TaxInfo>({})
  const [config, setConfig] = useStates<CalculationConfig>({})

  useEffect(
    () => {
      // Fetch data from API
      // const config = await fetchTaxCalConfig()
      setConfig(config)
    },
    [
      //TODO setup dependencies following to make config fetch work when needed
    ],
  )

  useEffect(() => {
    const taxInfo = calculateTaxInfo({
      ...income,
      config,
    })
    setTaxInfo(taxInfo)
  }, [income])

  return taxInfo
}

export default useTaxCalculator
