export interface CalculationConfig {
  //TODO: This is only a placeholder. Replace with actual types. Config from API can go here
  insurance?: {
    sickness: number
    workAccident: number
    maternity: number
    unemployment: number
    retirement: number
    health: number
    death: number
  }
  tax?: {
    taxRate: number
    taxDeduction: number
  }
}

export interface TaxCalInputProps {
  //TODO: This is only a placeholder. Replace with actual types
  'gross-income'?: number
  'income-insurance'?: number
  'eco-region'?: number
  'number-of-dependents'?: number

  config?: CalculationConfig
}

interface TaxCalOutputProps {
  // TODO: This is only a placeholder. Replace with actual types
  totalInsurance: number
  totalTax: number
  totalNetIncome: number
}

const calculateTaxInfo = (input: TaxCalInputProps): TaxCalOutputProps => {
  //TODO: This is only a placeholder. Replace with actual implementation.
  console.log(input)

  return {
    totalInsurance: 0,
    totalTax: 0,
    totalNetIncome: 0,
  }
}

export default calculateTaxInfo
