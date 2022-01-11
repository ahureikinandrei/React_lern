import { AxiosResponse } from 'axios'
import axios from '../core/axios'

// const url =
//     '51.509865%2C%20-0.118092?unitGroup=metric&include=current&key=64EQRH7GJNL5QE49J8465A556&contentType=json'

export default class WeatherService {
    static async getCurrentWeather(): Promise<AxiosResponse> {
        const response = await axios.get('51.509865%2C%20-0.118092')
        return response
    }
}
