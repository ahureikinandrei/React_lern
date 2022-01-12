import { IWeatherData } from '../store/reducers/weather/types'

export interface IDataFromApi {
    [key: string]: any
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

    return transformedData
}
