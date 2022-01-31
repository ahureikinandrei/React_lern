import axios from 'axios'
import {
    API_KEY_ZIPCODEBASE,
    BASE_URL_ZIPCODEBASE,
    WVC_KEY,
    WVC_URL,
} from '../config/constants'

class WeatherService {
    static generateQueryString(data) {
        return (
            `${WVC_URL + data}?unitGroup=metric&include=current&lang=en&` +
            `key=${WVC_KEY}&contentType=json`
        )
    }

    static async getWeather(query = ' ') {
        const weather = await axios.get(
            WeatherService.generateQueryString(query)
        )

        return weather
    }
}

export default WeatherService
