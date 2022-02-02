import { createSelector } from 'reselect'
import { IWeatherData, IWeatherForecastData, WeatherState } from './types'
import { RootState } from '../../store'
import { celsiusToFahrenheit } from '../../../utils/dataTransfrom'
import { DEGREES_FAHRENHEIT } from '../../../config/constants'
import { IGeolocationResponse } from '../../../utils/types'

export const selectIsLoadingWeather = (
    state: RootState
): WeatherState['isLoadingWeather'] => state.weather.isLoadingWeather

export const selectIsLoadingDataForGraph = (
    state: RootState
): WeatherState['isLoadingDataForGraph'] => state.weather.isLoadingDataForGraph

export const selectErrorWeatherData = (
    state: RootState
): WeatherState['errorWeatherData'] => state.weather.errorWeatherData

export const selectSnackbarMessage = (
    state: RootState
): WeatherState['snackbarMessage'] => state.weather.snackbarMessage

export const selectWeatherData = (
    state: RootState
): WeatherState['weatherData'] => state.weather.weatherData

export const selectWeatherDataForecast = (
    state: RootState
): IWeatherForecastData[] => state.weather.weatherData.forecast

export const selectTimezone = (state: RootState): string =>
    state.weather.weatherData.timezone || ''

export const selectWeatherDataLatitude = (state: RootState): number =>
    state.weather.weatherData.latitude || 0

export const selectWeatherDataLongitude = (state: RootState): number =>
    state.weather.weatherData.longitude || 0

export const selectWeatherTemp = (state: RootState): number =>
    state.weather.weatherData.temp || 0

export const selectWeatherUnits = (state: RootState): string =>
    state.weather.unitsDegrees

export const selectFavouritesForecastData = (
    state: RootState
): Array<IWeatherForecastData[]> =>
    state.weather.favouritesLocationsForecastData

export const selectTempInUnits = createSelector(
    selectWeatherUnits,
    selectWeatherTemp,
    (unitsDegrees, temp) => {
        if (unitsDegrees === DEGREES_FAHRENHEIT) {
            return celsiusToFahrenheit(temp)
        }
        return temp
    }
)

const transformDailyTempInFahrenheit = (
    dayData: IWeatherForecastData
): IWeatherForecastData => {
    return {
        ...dayData,
        temp: celsiusToFahrenheit(dayData.temp),
    }
}

export const selectFavouritesForecastDataInUnits = createSelector(
    selectWeatherUnits,
    selectFavouritesForecastData,
    (unitsDegrees, favouritesForecastData) => {
        if (unitsDegrees === DEGREES_FAHRENHEIT) {
            return favouritesForecastData.map((locationData) => {
                return locationData.map(transformDailyTempInFahrenheit)
            })
        }
        return favouritesForecastData
    }
)

export const selectWeatherForecastInUnits = createSelector(
    selectWeatherUnits,
    selectWeatherDataForecast,
    (unitsDegrees, forecast = []) => {
        if (unitsDegrees === DEGREES_FAHRENHEIT) {
            return forecast.map(transformDailyTempInFahrenheit)
        }
        return forecast
    }
)

export const selectCurrentSelectedLocation = createSelector(
    selectWeatherData,
    (weatherDate: IWeatherData): IGeolocationResponse | null => {
        if (weatherDate.location && weatherDate.location.length) {
            const [location] = weatherDate.location
            return location
        }

        return null
    }
)
