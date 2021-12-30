const UserRouteExpress = require('express')
const { check } = require('express-validator')
const userController = require('../controllers/user.controller')

const userRouter = new UserRouteExpress()

userRouter.post(
    '/user',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect password').isLength({
            min: 5,
            max: 12,
        }),
    ],
    userController.post
)

userRouter.get('/user/:id', userController.get)
userRouter.get('/user', userController.getAll)
userRouter.patch('/user', userController.patch)
userRouter.delete('/user', userController.delete)

module.exports = userRouter
