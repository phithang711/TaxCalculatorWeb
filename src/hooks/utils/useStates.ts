import { useState, useCallback } from 'react'

const useStates = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState)

  const setStates = useCallback((newState: Partial<T>) => {
    setState((prevState) => ({ ...prevState, ...newState }))
  }, [])

  return [state, setStates] as const
}

export default useStates
