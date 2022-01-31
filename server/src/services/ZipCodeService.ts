import axios from 'axios'
import { API_KEY_ZIPCODEBASE, BASE_URL_ZIPCODEBASE } from '../config/constants'

class ZipCodeService {
    static async getLocationFromZipCode(query: string, country?: string) {
        try {
            const queryCountry = country ? `&country=${country}` : ''

            const url =
                `${BASE_URL_ZIPCODEBASE}` +
                `${API_KEY_ZIPCODEBASE}&codes=${query}${queryCountry}`

            const response = await axios.get(url)

            const [firstSearchResultByZipCode] = response.data.results[query]

            return firstSearchResultByZipCode
        } catch (e) {
            return null
        }
    }
}

export default ZipCodeService
