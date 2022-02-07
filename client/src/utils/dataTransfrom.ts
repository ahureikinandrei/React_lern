import {
    IWeatherData,
    IWeatherForecastData,
} from '../store/reducers/weather/types'
import { unixToDay } from './dateUtils'
import {
    SHORT_DAY_DATE_FORMAT,
    NUMBER_OF_DAY_IN_THE_FORECAST,
} from '../config/constants'
import { IGeolocationResponse, IWeatherDataFromServer } from './types'
import { graphDataKeysType } from '../components/GraphWeather/GraphWeather'

function transformForecastData(
    forecast: IWeatherForecastData[],
    location?: string
): IWeatherForecastData[] {
    const transformedForecast = []
    for (let i = 0; i < NUMBER_OF_DAY_IN_THE_FORECAST; i += 1) {
        const { datetimeEpoch, temp, humidity, icon, windspeed } = forecast[i]
        transformedForecast.push({
            datetimeEpoch,
            temp,
            humidity,
            location,
            icon,
            windspeed,
        })
    }

    return transformedForecast
}

function transformLocationData(
    location: IGeolocationResponse[]
): string | null {
    if (!location.length) {
        return null
    }

    const [nearestLocation] = location
    return nearestLocation.name
}

export function transformDataFromWeatherApi(
    dataFromApi: IWeatherDataFromServer
): IWeatherData {
    const transformedData = {} as IWeatherData
    const location =
        transformLocationData(dataFromApi.location) || dataFromApi.address

    transformedData.timezone = dataFromApi.timezone
    transformedData.address = location
    transformedData.latitude = dataFromApi.latitude
    transformedData.longitude = dataFromApi.longitude
    transformedData.temp = dataFromApi.currentConditions.temp
    transformedData.datetimeEpoch = dataFromApi.currentConditions.datetimeEpoch
    transformedData.windspeed = dataFromApi.currentConditions.windspeed
    transformedData.humidity = dataFromApi.currentConditions.humidity
    transformedData.forecast = transformForecastData(dataFromApi.days, location)
    transformedData.location = dataFromApi.location

    return transformedData
}

interface IDataForForecastGraph {
    name: string
    Selected: number
    [propName: string]: number | string
}

export function transformForecastForGraph(
    data: IWeatherForecastData[],
    timezone: string,
    favouritesForecastData: Array<IWeatherForecastData[]>,
    dataKey: graphDataKeysType
): IDataForForecastGraph[] {
    return data.map((dayData, index) => {
        const dayForecast = {
            name: unixToDay(
                dayData.datetimeEpoch,
                timezone,
                SHORT_DAY_DATE_FORMAT
            ),
            hun: dayData.humidity,
            Selected: dayData[dataKey],
        } as IDataForForecastGraph

        favouritesForecastData.forEach((favouriteLocationData, ind) => {
            const dayData = favouriteLocationData[index]
            dayForecast[dayData.location || ind] = dayData[dataKey]
        })

        return dayForecast
    })
}

export function celsiusToFahrenheit(temp: number): number {
    return +((temp * 9) / 5 + 32).toFixed(3)
}

export function coordinatesToString(
    latitude: number,
    longitude: number
): string {
    return `${latitude},${longitude}`
}
