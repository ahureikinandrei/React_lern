import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { SECRET_KEY } from '../config/constants'
import { undefinedToEmptyString } from '../utils/utils'

declare module 'express-serve-static-core' {
    interface Request {
        user: string | JwtPayload
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'Auth error' })
        }

        const decoded = jwt.verify(token, undefinedToEmptyString(SECRET_KEY))

        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({ message: 'Auth error' })
    }
}

export default authMiddleware
