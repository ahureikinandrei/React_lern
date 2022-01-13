import {
    IWeatherData,
    IWeatherForecastData,
} from '../store/reducers/weather/types'

export interface IDataFromApi {
    [key: string]: any
}

function transformForecastData(
    forecast: IWeatherForecastData[]
): IWeatherForecastData[] {
    const transformedForecast = []
    for (let i = 0; i < 6; i += 1) {
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
