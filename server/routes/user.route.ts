import { Router } from 'express'
import { check } from 'express-validator'
import userController from '../controllers/user.controller'
import authMiddleware from '../middleware/auth.middleware'

const userRouter = Router()

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
userRouter.patch('/user', authMiddleware, userController.patch)
userRouter.patch(
    '/user/remove',
    authMiddleware,
    userController.removeLocationFromFavourites
)
userRouter.delete('/user', userController.delete)

export default userRouter
