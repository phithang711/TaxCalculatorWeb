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
  sicknessInsur?: number
  workAccidentInsur?: number
  maternityInsur?: number
  unemploymentInsur?: number
  retirementInsur?: number
  healthInsur?: number
  deathInsur?: number
}

export default TaxInfo
