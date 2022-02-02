import { AxiosResponse } from 'axios'
import axios from '../core/axios'
import { reqExpFindCountryByCode } from '../config/constants'

export default class WeatherService {
    static getCurrentWeather(
        searchValue: string,
        isZipCodeApiNeed = false
    ): Promise<AxiosResponse> {
        const body: {
            data: { query: string; isZipCodeApiNeed: boolean; country?: string }
        } = {
            data: { query: searchValue, isZipCodeApiNeed },
        }

        if (isZipCodeApiNeed) {
            const [country] = reqExpFindCountryByCode.exec(searchValue) || []
            const searchZipCode = searchValue.replace(country, '').trim()
            if (country) {
                body.data.country = country.toLowerCase()
            }
            body.data.query = searchZipCode
        }

        return axios.post('/api/weather/current', body)
    }
}
