import { AxiosResponse } from 'axios'
import axios from '../core/axios'

export default class WeatherService {
    static getCurrentWeather(searchValue: string): Promise<AxiosResponse> {
        const body = {
            data: searchValue,
        }

        return axios.post('/api/weather/current', body)
    }

    static weatherRequestFactory(): (
        searchValue: string
    ) => Promise<AxiosResponse> {
        return WeatherService.getCurrentWeather
    }
}
