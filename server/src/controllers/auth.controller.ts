import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import User from '../models/User'
import { SECRET_KEY, JWT_TOKEN_LIFE_TIME } from '../config/constants'
import { undefinedToEmptyString } from '../utils/utils'
import { errorHandler } from '../utils/errorHandler'

export type UserToken = {
    id: string
}
class AuthController {
    static _generateAccessToken(id: string) {
        const payload: UserToken = {
            id,
        }

        return jwt.sign(payload, undefinedToEmptyString(SECRET_KEY), {
            expiresIn: JWT_TOKEN_LIFE_TIME,
        })
    }

    async post(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.formatResponse(
                    req.body,
                    'Such user has not been found',
                    404
                )
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.formatResponse(req.body, 'Invalid password', 400)
            }

            const token = AuthController._generateAccessToken(user._id)
            const data = await user.populate('cities')

            return res.formatResponse(
                {
                    token,
                    user: {
                        email: user.email,
                        cities: data.cities || [],
                    },
                },
                'Login'
            )
        } catch (e) {
            return errorHandler(res, e)
        }
    }

    async get(req: Request, res: Response) {
        try {
            const user = await User.findById(req.user.id)

            if (!user) {
                return res.formatResponse(
                    null,
                    'Such user has not been found',
                    404
                )
            }

            const data = await user.populate('cities')

            return res.formatResponse(
                {
                    user: {
                        email: user.email,
                        cities: data.cities || [],
                    },
                },
                'Successful authentication'
            )
        } catch (e) {
            return errorHandler(res, e)
        }
    }
}

export default new AuthController()
