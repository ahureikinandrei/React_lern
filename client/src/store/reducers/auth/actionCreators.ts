import {
    AuthActionEnum,
    SetAuthAction,
    SetErrorAction,
    SetIsLoadingAction,
    SetUserAction,
} from './types'
import { IUser } from '../../../models/IUser'
import { AppDispatch } from '../../store'
import UserService from '../../../api/UserService'

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
    login:
        (email: string, password: string) => async (dispatch: AppDispatch) => {
            try {
                dispatch(AuthActionCreators.setIsLoading(true))
                const response = await UserService.getUser(email, password)
                const { data } = response.data
                if (data && data.token) {
                    localStorage.setItem('token', data.token)
                } else {
                    dispatch(AuthActionCreators.setError('Input is not valid'))
                }
                dispatch(AuthActionCreators.setIsLoading(false))
            } catch (e) {
                dispatch(AuthActionCreators.setError('Login error'))
            }
        },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('token')
        dispatch(AuthActionCreators.setUser({} as IUser))
        dispatch(AuthActionCreators.setIsAuth(false))
    },
}
