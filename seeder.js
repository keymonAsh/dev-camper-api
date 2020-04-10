const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')
const Course = require('./models/coures')
const Bootcamp = require('./models/bootcamp')
const User = require('./models/user')


dotenv.config({ path: './config/.env' })

mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify: false
})

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'))

const importData = async () => {
    try {
        await Bootcamp.create(bootcamps)
        await Course.create(courses)
        await User.create(users)
        console.log('Data Imported.'.green.inverse)
        process.exit()
    } catch (err) {
        console.error(err)
    }
}

const deleteData = async () => {
    try {
        await Bootcamp.deleteMany()
        await Course.deleteMany()
        await User.deleteMany()
        console.log('Data Destroyed.'.red.inverse)
        process.exit()
    } catch (err) {
        console.error(err)
    }
}

if(process.argv[2] === '-i') {
    importData()
} else if(process.argv[2] === '-d') {
    deleteData()
}