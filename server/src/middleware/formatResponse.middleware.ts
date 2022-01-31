import { NextFunction, Response, Request } from 'express'
import { CustomData } from '../types'

declare module 'express-serve-static-core' {
    interface Response {
        formatResponse: (
            data: CustomData,
            message: string,
            status?: number,
            errors?: string
        ) => Response
    }
}

export const formatResponse = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.formatResponse = (data, message, status?, errors?) => {
        const newData = {}

        Object.defineProperty(newData, 'data', {
            value: data,
            enumerable: true,
        })

        Object.defineProperty(newData, 'message', {
            value: message,
            enumerable: true,
        })

        if (errors) {
            Object.defineProperty(newData, 'errors', {
                value: errors,
                enumerable: true,
            })
        }

        if (status) {
            res.status(status)
        }

        return res.json(newData)
    }
    next()
}
