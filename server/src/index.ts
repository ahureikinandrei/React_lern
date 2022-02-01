import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
/* eslint-disable import/first */
dotenv.config()
import { PORT, DB_URL } from './config/constants'
import userRouter from './routes/user.route'
import authRouter from './routes/auth.route'
import corsMiddleware from './middleware/cors.middleware'
import weatherRoute from './routes/weather.route'
import { formatResponse } from './middleware/formatResponse.middleware'
import { undefinedToEmptyString } from './utils/utils'

const app = express()
const SERVER_PORT = PORT || 5000

app.use(corsMiddleware)
app.use(formatResponse)
app.use(express.json())

app.use('/api', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/weather', weatherRoute)

const start = async () => {
    try {
        await mongoose.connect(undefinedToEmptyString(DB_URL))

        app.listen(SERVER_PORT, () => {
            console.log('server start on port', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
