import axios from 'axios'
import { WVC_KEY, WVC_URL } from '../config/constants'
import { IWeatherDataResponse } from '../types'

class WeatherService {
    static generateQueryString(data: string) {
        return (
            `${WVC_URL + data}?unitGroup=metric&include=current&lang=en&` +
            `key=${WVC_KEY}&contentType=json`
        )
    }

    static async getWeather(query = ' ') {
        const weather = await axios.get<IWeatherDataResponse>(
            WeatherService.generateQueryString(query)
        )

        return weather
    }
}

export default WeatherService
