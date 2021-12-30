const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const User = require('../models/User')
const { SALT_LENGTH } = require('../config/constants')

class UserController {
    static async _hashPassword(password) {
        return bcrypt.hash(password, SALT_LENGTH)
    }

    async post(req, res) {
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

    async get(req, res) {
        try {
            const { id } = req.params

            if (!id) {
                return res.formatResponse({}, `ID not found`, 404)
            }

            const user = await User.findById(id)

            if (!user) {
                return res.formatResponse(
                    {},
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

    async getAll(req, res) {
        try {
            const users = await User.find()

            if (!users) {
                return res.formatResponse(
                    {},
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

    async patch(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.formatResponse(user, 'No such user', 404)
            }

            const hashPassword = await UserController._hashPassword(password)
            const newPassword = { password: hashPassword }

            await User.updateOne({ email }, newPassword)

            return res.formatResponse(user, 'User has been updated')
        } catch (e) {
            console.log(e)
            return res.formatResponse(e, 'Update user error', 400)
        }
    }

    async delete(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.formatResponse({}, 'No such user', 404)
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

module.exports = new UserController()
