import { useCallback, useReducer } from 'react'
import netIncomeCalReducer from '~/reducers/taxCal/netIncomeCalReducer'
import { Income } from '~/types/taxCal/income'

const useTaxCal = () => {
  // using netIncome reducer
  const [state, dispatch] = useReducer(netIncomeCalReducer, {})
  // Get config from here. Can use useFx or useTaxConfig()//
  // TODO: to be implemented if needed
  // const [config] = useTaxConfig({})

  const updateNewIncome = useCallback(
    (income: Income) => {
      dispatch({ type: 'UPDATE_NEW_INCOME', income })
    },
    [dispatch],
  )

  return { netIncome: state, dispatchNetIncome: dispatch, updateNewIncome }
}

export default useTaxCal
