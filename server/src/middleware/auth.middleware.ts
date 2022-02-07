import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { SECRET_KEY } from '../config/constants'
import { undefinedToEmptyString } from '../utils/utils'
import { UserToken } from '../controllers/auth.controller'

declare module 'express-serve-static-core' {
    interface Request {
        user: UserToken
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            return res.formatResponse(null, 'Authentication token missing', 401)
        }

        req.user = jwt.verify(
            token,
            undefinedToEmptyString(SECRET_KEY)
        ) as UserToken

        next()
    } catch (e) {
        return res.formatResponse(null, 'Authentication token missing', 401)
    }
}

export default authMiddleware
