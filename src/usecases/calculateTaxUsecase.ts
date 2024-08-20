// Types and interfaces
interface TaxBracket {
  threshold: number
  rate: number
}

interface InsuranceRate {
  socialInsurance: number
  healthInsurance: number
  unemploymentInsurance: number
}

interface DeductionConfig {
  personalDeduction: number
  dependentDeduction: number
}

export interface TaxConfig {
  taxBrackets: TaxBracket[]
  insuranceRates: InsuranceRate
  deductions: DeductionConfig
}

export interface NetIncomeInfo {
  grossIncome?: number
  netIncome?: number
  tax?: number
  insurance?: InsuranceDetails
  taxableIncome?: number
}

interface InsuranceDetails {
  socialInsurance: number
  healthInsurance: number
  unemploymentInsurance: number
  total: number
}

// Default configuration
const defaultConfig: TaxConfig = {
  taxBrackets: [
    { threshold: 60000000, rate: 0.05 },
    { threshold: 120000000, rate: 0.1 },
    { threshold: 216000000, rate: 0.15 },
    { threshold: 384000000, rate: 0.2 },
    { threshold: 624000000, rate: 0.25 },
    { threshold: 960000000, rate: 0.3 },
    { threshold: Infinity, rate: 0.35 },
  ],
  insuranceRates: {
    socialInsurance: 0.08,
    healthInsurance: 0.015,
    unemploymentInsurance: 0.01,
  },
  deductions: {
    personalDeduction: 11000000,
    dependentDeduction: 4400000,
  },
}

// Calculate detailed insurance contributions
function calculateDetailedInsurance(grossIncome: number, rates: InsuranceRate): InsuranceDetails {
  const baseForInsurance = Math.min(grossIncome, 20 * 1490000) // Cap at 20 times minimum wage
  const socialInsurance = baseForInsurance * rates.socialInsurance
  const healthInsurance = baseForInsurance * rates.healthInsurance
  const unemploymentInsurance = baseForInsurance * rates.unemploymentInsurance
  const total = socialInsurance + healthInsurance + unemploymentInsurance

  return {
    socialInsurance,
    healthInsurance,
    unemploymentInsurance,
    total,
  }
}

// Calculate taxable income
function calculateTaxableIncome(
  grossIncome: number,
  insuranceAmount: number,
  deductions: DeductionConfig,
  dependents: number,
): number {
  const { personalDeduction, dependentDeduction } = deductions
  const totalDeduction = personalDeduction + dependents * dependentDeduction
  return Math.max(grossIncome - insuranceAmount - totalDeduction, 0)
}

// Calculate income tax
function calculateIncomeTax(taxableIncome: number, taxBrackets: TaxBracket[]): number {
  let remainingIncome = taxableIncome
  let totalTax = 0

  for (let i = 0; i < taxBrackets.length; i++) {
    const { threshold, rate } = taxBrackets[i]
    const prevThreshold = i > 0 ? taxBrackets[i - 1].threshold : 0
    const bracketIncome = Math.min(remainingIncome, threshold - prevThreshold)

    totalTax += bracketIncome * rate
    remainingIncome -= bracketIncome

    if (remainingIncome <= 0) break
  }

  return totalTax
}

// Updated main function to calculate net income with detailed insurance
function calculateNetIncome({
  grossIncome,
  dependents,
  config = defaultConfig,
}: {
  grossIncome?: number
  dependents?: number
  config?: TaxConfig
}): NetIncomeInfo {
  console.log('grossIncome', grossIncome)
  const grossIncomeNumber = Number(grossIncome)
  if (isNaN(grossIncomeNumber) || grossIncomeNumber < 0) {
    return {}
  }

  const insurance = calculateDetailedInsurance(grossIncomeNumber, config.insuranceRates)
  const taxableIncome = calculateTaxableIncome(grossIncomeNumber, insurance.total, config.deductions, dependents || 0)
  const tax = calculateIncomeTax(taxableIncome, config.taxBrackets)
  const netIncome = grossIncomeNumber - insurance.total - tax

  console.log('netIncome', netIncome)
  return {
    netIncome,
    tax,
    insurance,
    taxableIncome,
  }
}

export default calculateNetIncome
