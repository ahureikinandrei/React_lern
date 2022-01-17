import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User'
import { SECRET_KEY, JWT_TOKEN_LIFE_TIME } from '../config/constants'

class AuthController {
    static _generateAccessToken(id) {
        const payload = {
            id,
        }

        return jwt.sign(payload, SECRET_KEY, {
            expiresIn: JWT_TOKEN_LIFE_TIME,
        })
    }

    async post(req, res) {
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

            return res.formatResponse(
                {
                    token,
                    user: {
                        email: user.email,
                    },
                },
                'Login'
            )
        } catch (e) {
            console.log(e)
            return res.formatResponse(e, 'Server error', 400)
        }
    }

    async get(req, res) {
        try {
            const user = await User.findOne({ _id: req.user.id })

            if (!user) {
                return res.formatResponse(
                    null,
                    'Such user has not been found',
                    404
                )
            }

            const token = AuthController._generateAccessToken(user._id)

            return res.formatResponse(
                {
                    token,
                    user: {
                        email: user.email,
                    },
                },
                'Successful authentication'
            )
        } catch (e) {
            console.log(e)
            return res.formatResponse(e, 'Server error', 400)
        }
    }

    async get(req, res) {
        try {
            const { id } = req.user

            const user = await User.findOne({ _id: id })

            if (!user) {
                return res.formatResponse(
                    null,
                    'Such user has not been found',
                    404
                )
            }

            const token = AuthController._generateAccessToken(user._id)

            return res.formatResponse(
                {
                    token,
                    user: {
                        email: user.email,
                    },
                },
                'Successful authentication'
            )
        } catch (e) {
            console.log(e)
            return res.formatResponse(e, 'Server error', 400)
        }
    }
}

export default new AuthController()
