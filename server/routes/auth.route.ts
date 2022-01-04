import { Router } from 'express'
import authController from '../controllers/auth.controller'

const authRoute = Router()
authRoute.post('/login', authController.post)

export default authRoute
