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
const { protect, authorize } = require('../middleware/auth')

const courseRouter = require('./courses')
router.use('/:bootcampId/courses', courseRouter)

router.route('/')
.get(advancedResults(Bootcamp, 'courses') , getBootcamps)
.post(protect, authorize('publisher', 'admin'), createBootcamp)

router.route('/:id')
.get(showBootcamp)
.put(protect, authorize('publisher', 'admin'), updateBootcamp)
.delete(protect, authorize('publisher', 'admin'), deleteBootcamp)

module.exports = router