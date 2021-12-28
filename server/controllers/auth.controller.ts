const config = require('config')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const saltLength = config.get('SALT_LENGTH')
const jwtTokenLifeTime = config.get('JWT_TOKEN_LIFE_TIME')

class AuthController {
    static generateAccessToken(id) {
        const payload = {
            id,
        }

        return jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: jwtTokenLifeTime,
        })
    }

    static async hashPassword(password) {
        const hashPassword = await bcrypt.hash(password, saltLength)
        return hashPassword
    }

    async post(req, res) {
        try {
            const { email, password } = req.body

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: 'Uncorrected request', errors })
            }

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res
                    .status(400)
                    .json({ message: `User with ${email} already exist` })
            }

            const hashPassword = await AuthController.hashPassword(password)
            const user = new User({ email, password: hashPassword })
            await user.save()
            return res.json({ message: 'User was created' })
        } catch (e) {
            return res.status(400).json({ message: 'Registration error' })
        }
    }

    async get(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                return res
                    .status(400)
                    .json({ message: `Such user has not been found` })
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: `Invalid password` })
            }

            const token = AuthController.generateAccessToken(user._id)
            return res.json({ token })
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Get user error' })
        }
    }

    async patch(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ message: `No such user` })
            }

            const hashPassword = await AuthController.hashPassword(password)
            const newPassword = { password: hashPassword }

            await User.updateOne({ email }, newPassword)

            return res.json('User was updated')
        } catch (e) {
            return res.status(400).json({ message: 'Update user error' })
        }
    }

    async delete(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ message: `No such user` })
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: `Invalid password` })
            }

            await User.deleteOne({ email })

            return res.json('User was deleted')
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Delete user error' })
        }
    }
}

module.exports = new AuthController()
