const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bootcamps = require('./routes/bootcamps')
const connectDB = require('./config/database')

dotenv.config({ path: './config/.env' })

connectDB()

app.use('/api/bootcamps', bootcamps)

app.listen(process.env.PORT, console.log("Server Live"))

