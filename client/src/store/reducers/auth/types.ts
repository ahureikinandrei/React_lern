import { IUser } from '../../../models/IUser'

export interface AuthState {
    isAuth: boolean
    user: IUser
    isLoading: boolean
    error: string
}

export enum AuthActionEnum {
    // eslint-disable-next-line no-unused-vars
    SET_AUTH = 'user/SET_USER_DATA',
    // eslint-disable-next-line no-unused-vars
    SET_ERROR = 'user/FETCH_SIGN_IN',
    // eslint-disable-next-line no-unused-vars
    SET_USER = 'user/FETCH_SIGN_UP',
    // eslint-disable-next-line no-unused-vars
    SET_IS_LOADING = 'user/FETCH_USER_DATA',
}

export interface SetAuthAction {
    type: AuthActionEnum.SET_AUTH
    payload: boolean
}

export interface SetErrorAction {
    type: AuthActionEnum.SET_ERROR
    payload: string
}

export interface SetUserAction {
    type: AuthActionEnum.SET_USER
    payload: IUser
}

export interface SetIsLoadingAction {
    type: AuthActionEnum.SET_IS_LOADING
    payload: boolean
}

export type AuthAction =
    | SetAuthAction
    | SetUserAction
    | SetErrorAction
    | SetIsLoadingAction
