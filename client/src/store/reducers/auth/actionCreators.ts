import { AxiosError } from 'axios'
import {
    AuthActionEnum,
    SetAuthAction,
    SetErrorAction,
    SetIsLoadingAction,
    SetUserAction,
    SetMessageAction,
} from './types'
import { IUser } from '../../../models/IUser'
import { AppDispatch } from '../../store'
import UserService from '../../../api/UserService'
import AuthService from '../../../api/AuthService'
import { SettingsActionCreators } from '../settings/actionsCreators'

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({
        type: AuthActionEnum.SET_USER,
        payload: user,
    }),
    setIsAuth: (auth: boolean): SetAuthAction => ({
        type: AuthActionEnum.SET_AUTH,
        payload: auth,
    }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({
        type: AuthActionEnum.SET_IS_LOADING,
        payload,
    }),
    setError: (payload: string): SetErrorAction => ({
        type: AuthActionEnum.SET_ERROR,
        payload,
    }),
    setMessage: (payload: string): SetMessageAction => ({
        type: AuthActionEnum.SET_MESSAGE,
        payload,
    }),
    login:
        (email: string, password: string) => async (dispatch: AppDispatch) => {
            try {
                dispatch(AuthActionCreators.setIsLoading(true))
                const response = await AuthService.getUser(email, password)
                const { data } = response.data

                if (data && data.token) {
                    localStorage.setItem('token', data.token)
                    dispatch(AuthActionCreators.setIsAuth(true))
                    dispatch(
                        SettingsActionCreators.updateFavorites(data.user.cities)
                    )
                } else {
                    dispatch(AuthActionCreators.setError('Input is not valid'))
                }
            } catch (e) {
                const error = e as AxiosError
                if (error.response) {
                    dispatch(
                        AuthActionCreators.setError(error.response.data.message)
                    )
                } else {
                    dispatch(AuthActionCreators.setError('Login error'))
                }
            }
            dispatch(AuthActionCreators.setIsLoading(false))
        },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('token')
        dispatch(AuthActionCreators.setUser({} as IUser))
        dispatch(AuthActionCreators.setIsAuth(false))
        dispatch(SettingsActionCreators.updateFavorites([]))
        dispatch(SettingsActionCreators.clearShownOnTheChartLocation())
    },
    auth: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            const response = await AuthService.validateUserToken()
            const { data } = response.data
            if (data && data.user) {
                dispatch(AuthActionCreators.setUser(data.user))
                dispatch(
                    SettingsActionCreators.updateFavorites(data.user.cities)
                )
                dispatch(AuthActionCreators.setIsAuth(true))
            } else {
                localStorage.removeItem('token')
                dispatch(AuthActionCreators.setUser({} as IUser))
                dispatch(AuthActionCreators.setIsAuth(false))
                dispatch(AuthActionCreators.setError('Invalid token'))
            }
        } catch (e) {
            dispatch(AuthActionCreators.setError('No such email'))
        }
        dispatch(AuthActionCreators.setIsLoading(false))
    },
    registration:
        (email: string, password: string) => async (dispatch: AppDispatch) => {
            try {
                dispatch(AuthActionCreators.setIsLoading(true))
                const response = await UserService.createUser(email, password)
                dispatch(AuthActionCreators.setMessage(response.data.message))
            } catch (e) {
                const error = e as AxiosError
                if (error.response) {
                    dispatch(
                        AuthActionCreators.setError(error.response.data.message)
                    )
                } else {
                    dispatch(AuthActionCreators.setError('Registration error'))
                }
            }
            dispatch(AuthActionCreators.setIsLoading(false))
        },
}
