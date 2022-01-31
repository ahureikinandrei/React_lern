import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { SALT_LENGTH } from '../config/constants'
import User from '../models/User'
import City from '../models/City'

class UserController {
    static async _hashPassword(password) {
        return bcrypt.hash(password, SALT_LENGTH)
    }

    async post(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.formatResponse(
                    req.body,
                    'Incorrect request',
                    400,
                    errors
                )
            }

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.formatResponse(
                    candidate,
                    `User with ${email} already exists`,
                    400
                )
            }

            const hashPassword = await UserController._hashPassword(password)
            const user = new User({ email, password: hashPassword })
            await user.save()
            return res.formatResponse(user, 'User has been created')
        } catch (e) {
            return res.formatResponse(e, 'Registration error', 400)
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
            console.log(e)
            return res.formatResponse(e, 'Get user error', 400)
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

            return res.formatResponse(users, 'Search results')
        } catch (e) {
            console.log(e)
            return res.formatResponse(e, 'Get users error', 400)
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

            return res.formatResponse(data, 'User has been updated')
        } catch (e) {
            return res.formatResponse(e.message, 'Update user error', 400)
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

            return res.formatResponse(data, 'User has been updated')
        } catch (e) {
            return res.formatResponse(e.message, 'Update user error', 400)
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
                return res.formatResponse({ email }, 'Invalid password', 400)
            }

            await User.deleteOne({ email })
            return res.formatResponse(user, 'User has been deleted')
        } catch (e) {
            console.log(e)
            return res.formatResponse(e, 'Delete user error', 400)
        }
    }
}

export default new UserController()
