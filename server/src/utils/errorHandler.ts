import axios from 'axios'
import { Response } from 'express'

export const errorHandler = (
    res: Response,
    e: unknown,
    message = 'Server error',
    statusCode = 500
) => {
    if (axios.isAxiosError(e)) {
        return res.formatResponse(
            e.response?.data,
            e.message || message,
            e.response?.status || statusCode
        )
    }

    if (e instanceof Error) {
        return res.formatResponse(e.message, message, statusCode)
    }
    return res.formatResponse(null, message, statusCode)
}
