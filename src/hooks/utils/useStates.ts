import { useState } from 'react'

const useStates = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState)

  const setStates = (newState: Partial<T>) => {
    setState((prevState) => ({ ...prevState, ...newState }))
  }

  return [state, setStates] as const
}

export default useStates
