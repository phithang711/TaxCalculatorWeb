type TaxInfo = {
  //TODO?: Define the type for TaxInfo. This is just a placeholder.
  employee?: {
    netIncome?: number
    insurance?: {
      retirementInsur?: number
      healthInsur?: number
      deathInsur?: number
      sicknessInsur?: number
      workAccidentInsur?: number
      maternityInsur?: number
      unemploymentInsur?: number
    }
    tax?: number
  }
  company?: {
    insurance?: {
      retirementInsur?: number
      healthInsur?: number
      deathInsur?: number
      sicknessInsur?: number
      workAccidentInsur?: number
      maternityInsur?: number
      unemploymentInsur?: number
    }
    total?: number
  }
}

export default TaxInfo
