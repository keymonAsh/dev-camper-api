const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/asyncHandeler')
const Course = require('../models/coures')
const Bootcamp = require('../models/bootcamp')

exports.getCourses = asyncHandler(async (req, res, next) => {
    let query
    if(req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId })
    } else {
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        })
    }
    const courses = await query
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    })
})

exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await (await Course.findById(req.params.id)).populate({
        path:  'bootcamp',
        select: 'name description'
    })
    if(!course) {
        return next(new ErrorResponse(`No course with ID of ${req.params.id}`, 404))
    }
    res.status(200).json({
        success: true,
        data: course
    })
})

exports.createCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId
    const bootcamp = await Bootcamp.findById(req.params.bootcampId)
    if(!bootcamp) {
        return next(new ErrorResponse(`No Bootcamp with ID of ${req.params.bootcampId}`, 404))
    }
    const course = await Course.create(req.body)
    res.status(200).json({
        success: true,
        data: course
    })
})

exports.updateCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id)
    if(!course) {
        return next(new ErrorResponse(`No course with ID of ${req.params.id}`, 404))
    }
    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        data: course
    })
}
)
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id)
    if(!course) {
        return next(new ErrorResponse(`No course with ID of ${req.params.id}`, 404))
    }
   await course.remove()
    res.status(200).json({
        success: true
    })
})