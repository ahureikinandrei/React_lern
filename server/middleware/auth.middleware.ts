import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/constants'

const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'Auth error123' })
        }

        const decoded = jwt.verify(token, SECRET_KEY)

        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({ message: 'Auth error' })
    }
}

export default authMiddleware
