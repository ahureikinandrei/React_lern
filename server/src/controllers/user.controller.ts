import { validationResult } from 'express-validator'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { SALT_LENGTH } from '../config/constants'
import User from '../models/User'
import City from '../models/City'
import { errorHandler } from '../utils/errorHandler'
import {
    transformUserFromDataBase,
    transformUsersFromDataBase,
} from '../utils/transformData'

class UserController {
    static async _hashPassword(password: string) {
        return bcrypt.hash(password, SALT_LENGTH)
    }

    async post(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const [error] = errors.array()
                return res.formatResponse(null, error.msg, 400)
            }

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.formatResponse(
                    null,
                    `User with ${email} already exists`,
                    400
                )
            }

            const hashPassword = await UserController._hashPassword(password)
            const user = new User({ email, password: hashPassword })
            await user.save()

            return res.formatResponse(
                { user: { email: user.email } },
                'User has been created'
            )
        } catch (e) {
            return errorHandler(res, e)
        }
    }

    async get(req: Request, res: Response) {
        try {
            const { id } = req.params

            if (!id) {
                return res.formatResponse(null, `ID not found`, 404)
            }

            const user = await User.findById(id)

            if (!user) {
                return res.formatResponse(
                    null,
                    `Such user has not been found`,
                    404
                )
            }

            return res.json(user)
        } catch (e) {
            return errorHandler(res, e)
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const users = await User.find()

            if (!users) {
                return res.formatResponse(
                    null,
                    'Such users has not been found',
                    404
                )
            }

            return res.formatResponse(
                transformUsersFromDataBase(users),
                'Search results'
            )
        } catch (e) {
            return errorHandler(res, e)
        }
    }

    async patch(req: Request, res: Response) {
        try {
            const user = await User.findOne({ _id: req.user.id })
            if (!user) {
                return res.formatResponse(
                    null,
                    'Such user has not been found',
                    404
                )
            }

            const { name, lat, lon, country } = req.body

            const cityInDb = await City.findOne({ name, lat, lon, country })

            const city = cityInDb || new City({ name, lat, lon, country })
            await city.save()

            user.cities.addToSet(city._id)
            await user.save()
            const data = await user.populate('cities')

            return res.formatResponse(
                transformUserFromDataBase(data),
                'User has been updated'
            )
        } catch (e) {
            return errorHandler(res, e, 'Update user error')
        }
    }

    async removeLocationFromFavourites(req: Request, res: Response) {
        try {
            const user = await User.findOne({ _id: req.user.id })
            if (!user) {
                return res.formatResponse(
                    null,
                    'Such user has not been found',
                    404
                )
            }

            const { id } = req.body

            if (!id) {
                return res.formatResponse(null, 'Id has not been found', 404)
            }

            user.cities.pull(id)
            await user.save()
            const data = await user.populate('cities')

            return res.formatResponse(
                transformUserFromDataBase(data),
                'User has been updated'
            )
        } catch (e) {
            return errorHandler(res, e, 'Update user error')
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.formatResponse(null, 'No such user', 404)
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.formatResponse(
                    { user: { email } },
                    'Invalid password',
                    400
                )
            }

            await User.deleteOne({ email })
            return res.formatResponse(
                { user: { email } },
                'User has been deleted'
            )
        } catch (e) {
            return errorHandler(res, e, 'Delete user error')
        }
    }
}

export default new UserController()
