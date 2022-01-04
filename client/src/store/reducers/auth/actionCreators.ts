import {
    AuthActionEnum,
    SetAuthAction,
    SetErrorAction,
    SetIsLoadingAction,
    SetUserAction,
} from './types'
import { IUser } from '../../../models/IUser'
import { AppDispatch } from '../../store'

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
        (username: string, password: string) =>
        async (dispatch: AppDispatch) => {
            try {
                console.log(username, password)
            } catch (e) {
                dispatch(AuthActionCreators.setError('Login error'))
            }
        },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('username')
        dispatch(AuthActionCreators.setUser({} as IUser))
        dispatch(AuthActionCreators.setIsAuth(false))
    },
}
