const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bootcamps = require('./routes/bootcamps')

dotenv.config({ path: './config/.env' })

app.use('/api/bootcamps', bootcamps)

app.listen(process.env.PORT, console.log("Server Live"))

