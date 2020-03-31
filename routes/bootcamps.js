const express = require('express')
const router = express.Router()
const {
    getBootcamps,
    createBootcamp,
    showBootcamp,
    updateBootcamp,
    deleteBootcamp
} = require('../controllers/bootcamps')

const Bootcamp = require('../models/bootcamp')
const advancedResults = require('../middleware/advancedResults')

const courseRouter = require('./courses')
router.use('/:bootcampId/courses', courseRouter)

router.route('/')
.get(advancedResults(Bootcamp, 'courses') , getBootcamps)
.post(createBootcamp)

router.route('/:id')
.get(showBootcamp)
.put(updateBootcamp)
.delete(deleteBootcamp)

module.exports = router