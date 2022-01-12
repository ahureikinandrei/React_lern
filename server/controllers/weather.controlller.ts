import axios from 'axios'
import { WVC_URL, WVC_KEY } from '../config/constants'

class WeatherController {
    static generateQueryString(data) {
        return (
            `${WVC_URL + data}?unitGroup=metric&include=current&lang=en&` +
            `key=${WVC_KEY}&contentType=json`
        )
    }

    async post(req, res) {
        try {
            const response = await axios.get(
                WeatherController.generateQueryString(req.body.data)
            )
            const { data } = response
            return res.formatResponse(data, 'Weather')
        } catch (e) {
            return res.formatResponse(e.response.data, 'Server error', 400)
        }
    }
}

export default new WeatherController()
