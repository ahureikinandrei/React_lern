import { RootState } from '../../store'
import { AuthState } from './types'

export const selectAuthState = (state: RootState): AuthState => state.auth

export const selectError = (state: RootState): AuthState['error'] =>
    state.auth.error

export const selectMessage = (state: RootState): AuthState['message'] =>
    state.auth.message

export const selectAuthStatus = (state: RootState): AuthState['isAuth'] =>
    state.auth.isAuth

export const selectAuthIsLoading = (state: RootState): AuthState['isLoading'] =>
    state.auth.isLoading
