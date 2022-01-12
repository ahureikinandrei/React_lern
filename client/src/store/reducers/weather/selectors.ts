import { RootState } from '../../store'
import { WeatherState } from './types'

export const selectSearchValue = (
    state: RootState
): WeatherState['searchValue'] => state.weather.searchValue

export const selectIsLoadingWeather = (
    state: RootState
): WeatherState['isLoadingWeather'] => state.weather.isLoadingWeather

export const selectErrorWeatherData = (
    state: RootState
): WeatherState['errorWeatherData'] => state.weather.errorWeatherData

export const selectSnackbarMessage = (
    state: RootState
): WeatherState['snackbarMessage'] => state.weather.snackbarMessage

export const selectWeatherData = (
    state: RootState
): WeatherState['weatherData'] => state.weather.weatherData
