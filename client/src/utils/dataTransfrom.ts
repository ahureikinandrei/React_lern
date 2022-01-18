import {
    IWeatherData,
    IWeatherForecastData,
} from '../store/reducers/weather/types'
import { unixToDay } from './dateUtils'

export interface IDataFromApi {
    [key: string]: any
}

function transformForecastData(
    forecast: IWeatherForecastData[]
): IWeatherForecastData[] {
    const transformedForecast = []
    for (let i = 0; i < 7; i += 1) {
        const { datetimeEpoch, temp, humidity } = forecast[i]
        transformedForecast.push({
            datetimeEpoch,
            temp,
            humidity,
        })
    }

    return transformedForecast
}

export function transformDataFromWeatherApi(
    dataFromApi: IDataFromApi
): IWeatherData {
    const transformedData = {} as IWeatherData

    transformedData.timezone = dataFromApi.timezone
    transformedData.address = dataFromApi.address
    transformedData.latitude = dataFromApi.latitude
    transformedData.longitude = dataFromApi.longitude
    transformedData.temp = dataFromApi.currentConditions.temp
    transformedData.datetimeEpoch = dataFromApi.currentConditions.datetimeEpoch
    transformedData.windspeed = dataFromApi.currentConditions.windspeed
    transformedData.humidity = dataFromApi.currentConditions.humidity
    transformedData.forecast = transformForecastData(dataFromApi.days)

    return transformedData
}

interface IDataForForecastGraph {
    name: string
    temp: number
}

export function transformForecastForGraph(
    data: IWeatherForecastData[]
): IDataForForecastGraph[] {
    return data.map((dayData) => {
        return {
            name: unixToDay(dayData.datetimeEpoch, true),
            temp: dayData.temp,
        }
    })
}

export function celsiusToFahrenheit(temp: number): number {
    return +((temp * 9) / 5 + 32).toFixed(3)
}
