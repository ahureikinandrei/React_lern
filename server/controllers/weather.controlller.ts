import axios from 'axios'
import {
    WVC_URL,
    WVC_KEY,
    API_KEY_OPEN_WEATHER,
    BASE_URL_GEOLOCATION,
} from '../config/constants'

class WeatherController {
    static generateQueryString(data) {
        return (
            `${WVC_URL + data}?unitGroup=metric&include=current&lang=en&` +
            `key=${WVC_KEY}&contentType=json`
        )
    }

    static async getLocationByCoords(latitude: number, longitude: number) {
        const params = {
            lat: latitude,
            lon: longitude,
            limit: 1,
            appid: API_KEY_OPEN_WEATHER,
        }
        try {
            const response = await axios.get(
                `${BASE_URL_GEOLOCATION}/reverse`,
                {
                    params,
                }
            )
            return response.data
        } catch (e) {
            if (e.response) {
                return e.response.data
            }
            return { message: 'Geo-service error' }
        }
    }

    async post(req, res) {
        try {
            const responseData = {}
            const weather = await axios.get(
                WeatherController.generateQueryString(req.body.data)
            )

            const { data } = weather

            const location = await WeatherController.getLocationByCoords(
                data.latitude,
                data.longitude
            )

            Object.assign(responseData, data)

            if (location) {
                Object.defineProperty(responseData, 'location', {
                    value: location,
                    enumerable: true,
                })
            }

            return res.formatResponse(responseData, 'Weather')
        } catch (e) {
            if (e.response) {
                return res.formatResponse(e.response.data, 'Server error', 400)
            }
            return res.formatResponse(e.data, 'Server error', 400)
        }
    }
}

export default new WeatherController()
