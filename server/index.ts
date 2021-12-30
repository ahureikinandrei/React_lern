require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRouterModule = require('./routes/user.route')
const authRouterModule = require('./routes/auth.route')
const { PORT, DB_URL } = require('./config/constants')

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

        console.log(newData)
        return res.json(newData)
    }
    next()
}

app.use(express.json())
app.use(formatResponse)
app.use('/api', userRouterModule)
app.use('/api/auth', authRouterModule)

const start = async () => {
    try {
        mongoose.connect(DB_URL)

        app.listen(SERVER_PORT, () => {
            console.log('server start on port', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
