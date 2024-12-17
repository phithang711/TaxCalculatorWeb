type TaxInfo = {
  //TODO?: Define the type for TaxInfo. This is just a placeholder.
  employee?: {
    netIncome?: number
    insurance?: WorkInsurance
    tax?: number
  }
  company?: {
    insurance?: WorkInsurance
    total?: number
  }
}

export type WorkInsurance = {
  unemploymentInsurance?: number
  socialInsurance?: number
  healthInsurance?: number
}

export default TaxInfo
