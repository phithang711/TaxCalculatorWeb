import { Income } from '~/types/taxCal/income'
import TaxInfo from '~/types/taxCal/taxInfos'
import calculateNetIncome, { NetIncomeInfo, TaxConfig } from '~/usecases/calculateTaxUsecase'

interface NetIncomeCalState {
  error?: string
  loading?: boolean
  netIncomeInfo?: TaxInfo
}

type UpdateNewIncomeAction = {
  type: 'UPDATE_NEW_INCOME'
  income: Income
  config?: TaxConfig
}

type netIncomeCalReducerAction = UpdateNewIncomeAction

function netIncomeCalReducer(state: NetIncomeCalState, action: netIncomeCalReducerAction): NetIncomeCalState {
  switch (action.type) {
    case 'UPDATE_NEW_INCOME': {
      const income = action.income
      const config = action.config

      try {
        const taxInfo = calculateNetIncome({
          grossIncome: income?.['gross-income'],
          insuranceBase: income?.['income-insurance'],
          allowance: income?.['income-allowance'],
          regionCode: income?.['eco-region'],
          dependents: income?.['number-of-dependents'],
          config: config,
        })

        return {
          ...state,
          netIncomeInfo: mapToTaxInfo(taxInfo),
        }
      } catch (error) {
        return {
          ...state,
          error: error?.toString(),
        }
      }
    }

    default:
      return state
  }
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

export default netIncomeCalReducer
