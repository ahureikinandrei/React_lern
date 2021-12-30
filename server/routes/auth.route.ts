const AuthRouteExpress = require('express')

const authRoute = new AuthRouteExpress()
const authController = require('../controllers/auth.controller')

authRoute.post('/registration', authController.post)

module.exports = authRoute
