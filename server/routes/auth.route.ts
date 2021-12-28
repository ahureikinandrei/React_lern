const Router = require('express')
const { check } = require('express-validator')
const authController = require('../controllers/auth.controller')

const router = new Router()

router.post(
    '/user',
    [
        check('email', 'Uncorrected email').isEmail(),
        check('password', 'Uncorrected password').isLength({
            min: 5,
            max: 12,
        }),
    ],
    authController.post
)
router.get('/user', authController.get)
router.patch('/user', authController.patch)
router.delete('/user', authController.delete)

module.exports = router
