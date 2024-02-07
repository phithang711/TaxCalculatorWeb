import {Decimal} from "decimal.js";

interface InsuranceConfig {
  employee: InsuranceDetailConfig
  employer: InsuranceDetailConfig
}

interface InsuranceDetailConfig {
  pension: Decimal
  sickness: Decimal
  disability: Decimal
  unemployment: Decimal
  health: Decimal
}

interface PitState {
  grossIncome: Decimal
  salary: Decimal
  socialInsurance: SocialInsurance
  tax: Tax
  netIncome: Decimal
  employerCost: Decimal
}

interface SocialInsurance {
  employee: SocialInsuranceDetails
  employer: SocialInsuranceDetails
}

interface SocialInsuranceDetails {
  total: Decimal
  pension: Decimal
  sickness: Decimal
  disability: Decimal
  unemployment: Decimal
  health: Decimal
}

interface Tax {
  taxableIncome: Decimal
  total: Decimal
  brackets: TaxBracket[]
}

interface TaxBracket {
  from: Decimal
  to: Decimal
  rate: Decimal
  taxable: Decimal
  tax: Decimal
}

export type {PitState, SocialInsurance, SocialInsuranceDetails, Tax, TaxBracket, InsuranceConfig, InsuranceDetailConfig}
