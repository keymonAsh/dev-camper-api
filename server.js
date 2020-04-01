const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')
const connectDB = require('./config/database')
const colors = require('colors')
const errorhandler = require('./middleware/errorHandler')

dotenv.config({ path: './config/.env' })

connectDB()

app.use(express.json())
app.use('/api/bootcamps', bootcamps)
app.use('/api/courses', courses)
app.use('/api', auth)
app.use(errorhandler)

const server = app.listen(process.env.PORT, console.log("Server Live".yellow))

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`.red)
    server.close(() => process.exit(1))
})

