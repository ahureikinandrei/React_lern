import { Router } from 'express'
import weatherController from '../controllers/weather.controller'

const weatherRoute = Router()
weatherRoute.post('/current', weatherController.post)

export default weatherRoute
