import axios from 'axios'
import { API_KEY_OPEN_WEATHER, BASE_URL_GEOLOCATION } from '../config/constants'

class GeoLocationService {
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
}

export default GeoLocationService
