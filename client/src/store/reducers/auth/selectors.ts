import { RootState } from '../../store'
import { AuthState } from './types'

export const selectError = (state: RootState): AuthState['error'] =>
    state.auth.error

export const selectMessage = (state: RootState): AuthState['message'] =>
    state.auth.message
