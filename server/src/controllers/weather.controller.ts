import { Request, Response } from 'express'
import { transformLocation } from '../utils/utils'
import ZipCodeService from '../services/ZipCodeService'
import WeatherService from '../services/WeatherService'
import GeoLocationService from '../services/GeoLocationService'
import { errorHandler } from '../utils/errorHandler'
import { IWeatherData } from '../types'

interface IWeatherControllerBody {
    data: {
        query: string
        isZipCodeApiNeed: boolean
        country?: string
    }
}

interface ILocationFromZipCodeApi {
    postal_code?: string
    country_code?: string
    latitude?: string
    longitude?: string
    city?: string
    state?: string
    state_code?: string
    province?: string | null
    province_code?: string | null
}

class WeatherController {
    static generateQueryStringFromZipCodeApi(
        locationFromZipCodeApi: ILocationFromZipCodeApi
    ) {
        const { latitude, longitude } = locationFromZipCodeApi
        if (!latitude || !longitude) {
            return null
        }
        return `${transformLocation(latitude)},${transformLocation(longitude)}`
    }

    async post(req: Request, res: Response) {
        try {
            const responseData = {} as IWeatherData
            const locationFromZipCodeApi = {} as ILocationFromZipCodeApi

            const { body } = req
            const { data } = body as IWeatherControllerBody
            const { query, isZipCodeApiNeed, country } = data

            if (!data || !query) {
                return res.formatResponse(null, 'No data', 400)
            }

            if (isZipCodeApiNeed) {
                const locationByZipCode =
                    await ZipCodeService.getLocationFromZipCode(query, country)

                Object.assign(locationFromZipCodeApi, locationByZipCode)
            }

            const stringLocationFromZipCodeApi =
                WeatherController.generateQueryStringFromZipCodeApi(
                    locationFromZipCodeApi
                )

            const requestData = stringLocationFromZipCodeApi || query

            const weather = await WeatherService.getWeather(requestData)

            const location = await GeoLocationService.getLocationByCoords(
                weather.data.latitude,
                weather.data.longitude
            )

            Object.assign(responseData, weather.data)

            if (location) {
                Object.defineProperty(responseData, 'location', {
                    value: location,
                    enumerable: true,
                })
            }

            return res.formatResponse(responseData, 'Weather')
        } catch (e) {
            errorHandler(res, e)
        }
    }
}

export default new WeatherController()
