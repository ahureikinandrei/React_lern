import axios from 'axios'
import { API_KEY_ZIPCODEBASE, BASE_URL_ZIPCODEBASE } from '../config/constants'
import { IZipCodeServiceResponse } from '../types'

class ZipCodeService {
    static async getLocationFromZipCode(query: string, country?: string) {
        try {
            const queryCountry = country ? `&country=${country}` : ''

            const url =
                `${BASE_URL_ZIPCODEBASE}` +
                `${API_KEY_ZIPCODEBASE}&codes=${query}${queryCountry}`

            console.log(url)

            const response = await axios.get<IZipCodeServiceResponse>(url)

            const [firstSearchResultByZipCode] = response.data.results[query]

            return firstSearchResultByZipCode
        } catch (e) {
            return null
        }
    }
}

export default ZipCodeService
