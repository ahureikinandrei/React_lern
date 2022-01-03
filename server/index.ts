import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
/* eslint-disable import/first */
dotenv.config()
import { PORT, DB_URL } from './config/constants'
import userRouter from './routes/user.route'
import authRouter from './routes/auth.route'

const app = express()
const SERVER_PORT = PORT || 5000

const formatResponse = (req, res, next) => {
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

app.use(express.json())
app.use(formatResponse)
app.use('/api', userRouter)
app.use('/api/auth', authRouter)

const start = async () => {
    try {
        await mongoose.connect(DB_URL)

        app.listen(SERVER_PORT, () => {
            console.log('server start on port', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
