import { store } from '~/configs/store.config.ts'

type RootState = ReturnType<typeof store.getState>

export default RootState
