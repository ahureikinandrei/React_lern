import axios from 'axios'
import { transformLocation } from '../utils/utils'
import ZipCodeService from '../services/ZipCodeService'
import WeatherService from '../services/WeatherService'
import GeoLocationService from '../services/GeoLocationService'

class WeatherController {
    static generateQueryStringFromZipCodeApi(locationFromZipCodeApi) {
        const { latitude, longitude } = locationFromZipCodeApi
        if (!latitude || !longitude) {
            return null
        }
        return `${transformLocation(latitude)},${transformLocation(longitude)}`
    }

    async post(req, res) {
        try {
            const responseData = {}
            const locationFromZipCodeApi = {}

            const { body } = req
            const { data } = body
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
            if (axios.isAxiosError(e)) {
                return res.formatResponse(e.response.data, 'Server error', 400)
            }
            return res.formatResponse(e.message, 'Server error', 400)
        }
    }
}

export default new WeatherController()
