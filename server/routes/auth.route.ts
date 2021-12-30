import { Router } from 'express'
import authController from '../controllers/auth.controller'

const authRoute = Router()
authRoute.post('/registration', authController.post)

export default authRoute
