import { AxiosError } from 'axios'
import {
    WeatherActionEnum,
    SetIsLoadingWeatherAction,
    SetSearchValueAction,
    IWeatherData,
    SetWeatherData,
    SetErrorWeatherData,
    SetSnackbarMessage,
    SwitchUnits,
} from './types'
import { AppDispatch } from '../../store'
import WeatherService from '../../../api/WeatherService'
import GeoLocationService from '../../../api/GeoLocationService'
import { coordinatesToString } from '../../../utils/unifyUtils'
import { IGeolocationErrorResponse } from '../../../api/types'
import { transformDataFromWeatherApi } from '../../../utils/dataTransfrom'
import { KEY_UNITS_IN_LOCAL_STORAGE } from '../../../config/constants'

export const WeatherActionCreators = {
    setIsLoading: (payload: boolean): SetIsLoadingWeatherAction => ({
        type: WeatherActionEnum.SET_IS_LOADING_WEATHER,
        payload,
    }),
    setErrorWeatherData: (payload: string): SetErrorWeatherData => ({
        type: WeatherActionEnum.SET_ERROR_WEATHER_DATA,
        payload,
    }),
    setSnackbarMessage: (payload: string): SetSnackbarMessage => ({
        type: WeatherActionEnum.SET_SNACKBAR_MESSAGE,
        payload,
    }),
    setSearchValue: (payload: string): SetSearchValueAction => ({
        type: WeatherActionEnum.SET_SEARCH_VALUE,
        payload,
    }),
    setWeatherData: (payload: IWeatherData): SetWeatherData => ({
        type: WeatherActionEnum.SET_WEATHER_DATA,
        payload,
    }),
    switchUnits: (payload: string): SwitchUnits => {
        localStorage.setItem(KEY_UNITS_IN_LOCAL_STORAGE, payload)
        return {
            type: WeatherActionEnum.SWITCH_UNITS,
            payload,
        }
    },
    getWeatherInfo: (query: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(WeatherActionCreators.setSearchValue(query))
            dispatch(WeatherActionCreators.setIsLoading(true))
            const response = await WeatherService.getCurrentWeather(query)
            const { data } = response.data
            console.log(data)
            dispatch(
                WeatherActionCreators.setWeatherData(
                    transformDataFromWeatherApi(data)
                )
            )
            dispatch(WeatherActionCreators.setErrorWeatherData(''))
        } catch (e) {
            const error = e as AxiosError
            if (error.response) {
                const { data } = error.response.data
                dispatch(WeatherActionCreators.setSnackbarMessage(data))
            }
        }
        dispatch(WeatherActionCreators.setIsLoading(false))
    },
    getWeatherInCurrentLocation: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(WeatherActionCreators.setIsLoading(true))
            const locationData =
                await GeoLocationService.getCurrentLocationCoords()
            const query = coordinatesToString(
                locationData.latitude,
                locationData.longitude
            )
            dispatch(WeatherActionCreators.setSearchValue(query))
            const response = await WeatherService.getCurrentWeather(query)
            const { data } = response.data
            console.log(data)
            dispatch(
                WeatherActionCreators.setWeatherData(
                    transformDataFromWeatherApi(data)
                )
            )
        } catch (e) {
            const error = e as IGeolocationErrorResponse
            dispatch(WeatherActionCreators.setErrorWeatherData(error.message))
        }
        dispatch(WeatherActionCreators.setIsLoading(false))
    },
}
