import axios from 'axios'
import { Response } from 'express'

export const errorHandler = (
    res: Response,
    e: unknown,
    message = 'Server error',
    statusCode = 500
) => {
    if (axios.isAxiosError(e)) {
        console.log(e.response?.data)
        console.log(e.message)
        return res.formatResponse(e.response?.data, message, statusCode)
    }

    if (e instanceof Error) {
        console.log(e.message)
        return res.formatResponse(e.message, message, statusCode)
    }
    return res.formatResponse(null, message, statusCode)
}
