require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth.route')

const app = express()
const PORT = process.env.PORT || 5000
const { DB_URL } = process.env

app.use(express.json())
app.use('/api/auth', authRouter)

const start = async () => {
    try {
        mongoose.connect(DB_URL)

        app.listen(PORT, () => {
            console.log('server start on port', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
