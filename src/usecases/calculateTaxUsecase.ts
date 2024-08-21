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
  economicRegion?: EconomicRegion[]
  versionDate: Date
}

export interface EconomicRegion {
  regionCode: number
  minimumWage: number
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
  economicRegion: [
    {
      regionCode: 1,
      minimumWage: 4960000,
    },
    {
      regionCode: 2,
      minimumWage: 4410000,
    },
    {
      regionCode: 3,
      minimumWage: 3860000,
    },
    {
      regionCode: 4,
      minimumWage: 3450000,
    },
  ],
  versionDate: new Date('2024-08-01'),
}

// Calculate detailed insurance contributions
function calculateDetailedInsurance({
  grossIncome,
  insuranceBase = grossIncome,
  rates,
  minimumWage,
}: {
  grossIncome: number
  insuranceBase: number
  rates: InsuranceRate
  minimumWage: number
}): InsuranceDetails {
  const baseForInsurance = Math.min(Math.max(insuranceBase, minimumWage), grossIncome)
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
  insuranceBase = grossIncome,
  regionCode,
}: {
  grossIncome?: number
  dependents?: number
  config?: TaxConfig
  insuranceBase?: number
  regionCode?: number
}): NetIncomeInfo {
  const grossIncomeNumber = Number(grossIncome)
  const insuranceBaseNumber = Number(insuranceBase)
  if (isNaN(grossIncomeNumber) || grossIncomeNumber < 0) {
    return {}
  }

  const minimumWage = config.economicRegion?.find((region) => region.regionCode == regionCode)?.minimumWage

  const insurance = calculateDetailedInsurance({
    grossIncome: grossIncomeNumber,
    insuranceBase: isNaN(insuranceBaseNumber) || !insuranceBaseNumber ? grossIncomeNumber : insuranceBaseNumber,
    rates: config.insuranceRates,
    minimumWage: minimumWage ?? config.economicRegion?.[0].minimumWage ?? 4960000,
  })
  const taxableIncome = calculateTaxableIncome(grossIncomeNumber, insurance.total, config.deductions, dependents || 0)
  const tax = calculateIncomeTax(taxableIncome, config.taxBrackets)
  const netIncome = grossIncomeNumber - insurance.total - tax

  return {
    netIncome,
    tax,
    insurance,
    taxableIncome,
  }
}

export default calculateNetIncome
