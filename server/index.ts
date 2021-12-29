require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth.route')
const { PORT, DB_URL } = require('./config/constants')

const app = express()
const SERVER_PORT = PORT || 5000

app.use(express.json())
app.use('/api/auth', authRouter)

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
