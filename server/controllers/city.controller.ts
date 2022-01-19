import City from '../models/City'

class CityController {
    async post(req, res) {
        try {
            const { name, lat, lon, country } = req.body

            const cityInDb = await City.findOne({ name, lat, lon, country })

            if (cityInDb) {
                return res.formatResponse(
                    cityInDb,
                    `This city already exists`,
                    400
                )
            }

            const city = new City({ name, lat, lon, country })
            await city.save()
            return res.formatResponse(city, 'City has been added to favourites')
        } catch (e) {
            return res.formatResponse(e, 'Server error', 400)
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async get(req, res) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async getAll(req, res) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async patch(req, res) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async delete(req, res) {}
}

export default new CityController()
