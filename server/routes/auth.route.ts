import { Router } from 'express'
import authController from '../controllers/auth.controller'
import authMiddleware from '../middleware/auth.middleware'

const authRoute = Router()
authRoute.post('/login', authController.post)
authRoute.get('/auth', authMiddleware, authController.auth)

export default authRoute
