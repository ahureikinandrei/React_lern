class WeatherController {
    async get(req, res) {
        try {
            const { searchData } = req.params
        } catch (e) {
            console.log(e)
            return res.formatResponse(e, 'Server error', 400)
        }
    }
}

export default new WeatherController()
