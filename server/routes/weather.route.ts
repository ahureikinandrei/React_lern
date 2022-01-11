import { Router } from 'express'
import weatherController from '../controllers/weather.controlller'

const weatherRoute = Router()
weatherRoute.post('/current/:searchData', weatherController.get)

export default weatherRoute
