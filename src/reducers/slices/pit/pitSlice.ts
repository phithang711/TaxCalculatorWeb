import {Decimal} from "decimal.js";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import CalculatePitPayload from "~/reducers/slices/pit/calculatePitPayload.ts";
import {PitState, SocialInsuranceDetails, TaxBracket} from "~/reducers/slices/pit/types.ts";

const initialState: PitState = {
  grossIncome: new Decimal(0),
  salary: new Decimal(0),
  socialInsurance: {
    employee: {
      total: new Decimal(0),
      pension: new Decimal(0),
      sickness: new Decimal(0),
      disability: new Decimal(0),
      unemployment: new Decimal(0),
      health: new Decimal(0),
    },
    employer: {
      total: new Decimal(0),
      pension: new Decimal(0),
      sickness: new Decimal(0),
      disability: new Decimal(0),
      unemployment: new Decimal(0),
      health: new Decimal(0),
    },
  },
  tax: {
    taxableIncome: new Decimal(0),
    total: new Decimal(0),
    brackets: [],
  },
  netIncome: new Decimal(0),
  employerCost: new Decimal(0),
}

const pitSlice = createSlice({
  name: 'pit-slice',
  initialState,
  reducers: {
    calculatePit: (state, action: PayloadAction<CalculatePitPayload>) => {
      const {grossIncome, salary} = action.payload
      const socialInsurance = calculateSocialInsurance(salary)
      const tax = calculateTax(grossIncome, socialInsurance.employee.total)
      const netIncome = calculateNetIncome(grossIncome, socialInsurance.employee.total, tax.total)
      const employerCost = calculateEmployerCost(salary, socialInsurance.employer.total)

      state.grossIncome = grossIncome
      state.salary = salary
      state.socialInsurance = socialInsurance
      state.tax = tax
      state.netIncome = netIncome
      state.employerCost = employerCost
    }
  },
})

function calculateSocialInsurance(salary: Decimal) {
  const employee = calculateEmployeeSocialInsurance(salary)
  const employer = calculateEmployerSocialInsurance(salary)
  return {employee, employer}
}

function calculateEmployeeSocialInsurance(salary: Decimal) : SocialInsuranceDetails {
  const pension = calculatePension(salary, 0.08)
  const sickness = calculateSickness(salary, 0)
  const disability = calculateDisability(salary, 0)
  const unemployment = calculateUnemployment(salary, 0.01)
  const health = calculateHealth(salary, 0.015)
  const total = pension.plus(sickness).plus(disability).plus(unemployment).plus(health)
  return {total, pension, sickness, disability, unemployment, health}
}

function calculateEmployerSocialInsurance(salary: Decimal) : SocialInsuranceDetails {
  const pension = calculatePension(salary, 0.14)
  const sickness = calculateSickness(salary, 0.03)
  const disability = calculateDisability(salary, 0.005)
  const unemployment = calculateUnemployment(salary, 0.01)
  const health = calculateHealth(salary, 0.03)
  const total = pension.plus(sickness).plus(disability).plus(unemployment).plus(health)
  return {total, pension, sickness, disability, unemployment, health}
}

function calculatePension(salary: Decimal, rate: number) : Decimal {
  return salary.times(rate)
}

function calculateSickness(salary: Decimal, rate: number) : Decimal {
  return salary.times(rate)
}

function calculateDisability(salary: Decimal, rate: number) : Decimal {
  return salary.times(rate)
}

function calculateUnemployment(salary: Decimal, rate: number) : Decimal {
  return salary.times(rate)
}

function calculateHealth(salary: Decimal, rate: number) : Decimal {
  return salary.times(rate)
}

function calculateTax(grossIncome: Decimal, socialInsurance: Decimal) {
  const taxableIncome = grossIncome.minus(socialInsurance).minus(new Decimal(11_000_0000))
  const brackets = calculateTaxBrackets(taxableIncome)
  const total = calculateTaxTotal(brackets)
  return {taxableIncome, total, brackets}
}

function calculateTaxBrackets(taxableIncome: Decimal) : TaxBracket[] {
  let brackets : TaxBracket[] = [
    {from: new Decimal(0), to: new Decimal(5_000_000), rate: new Decimal(0.05), taxable: new Decimal(0), tax: new Decimal(0)},
    {from: new Decimal(5_000_000), to: new Decimal(10_000_000), rate: new Decimal(0.10), taxable: new Decimal(0), tax: new Decimal(0)},
    {from: new Decimal(10_000_000), to: new Decimal(18_000_000), rate: new Decimal(0.15), taxable: new Decimal(0), tax: new Decimal(0)},
    {from: new Decimal(18_000_000), to: new Decimal(32_000_000), rate: new Decimal(0.20), taxable: new Decimal(0), tax: new Decimal(0)},
    {from: new Decimal(32_000_000), to: new Decimal(52_000_000), rate: new Decimal(0.25), taxable: new Decimal(0), tax: new Decimal(0)},
    {from: new Decimal(52_000_000), to: new Decimal(80_000_000), rate: new Decimal(0.30), taxable: new Decimal(0), tax: new Decimal(0)},
    {from: new Decimal(80_000_000), to: new Decimal(Infinity), rate: new Decimal(0.35), taxable: new Decimal(0), tax: new Decimal(0)},
  ]

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i]
    if (taxableIncome.gte(bracket.from)) {
      bracket.taxable = taxableIncome.minus(bracket.from)
      bracket.tax = bracket.taxable.times(bracket.rate)
    }
  }

  return brackets
}

function calculateTaxTotal(brackets: any[]) {
  return brackets.reduce((acc, bracket) => acc.plus(bracket.tax), new Decimal(0))
}

function calculateNetIncome(grossIncome: Decimal, socialInsurance: Decimal, tax: Decimal) {
  return grossIncome.minus(socialInsurance).minus(tax)
}

function calculateEmployerCost(salary: Decimal, socialInsurance: Decimal) {
  return salary.plus(socialInsurance)
}

export const {calculatePit} = pitSlice.actions
export default pitSlice.reducer
