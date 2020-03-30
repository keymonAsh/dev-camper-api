const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/asyncHandeler')
const Bootcamp = require('../models/bootcamp')

exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find()
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
})

exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({
        success: true,
        data: bootcamp
    })
})

exports.showBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if(!bootcamp) {
        return   next(new ErrorResponse(`Bootcamp not found with ID: ${req.params.id}`, 404))
    }
    res.status(200).json({
        success: true,
        data: bootcamp
    })
})

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with ID: ${req.params.id}`, 404))
    }
    res.status(200).json({
        success: true,
        data: bootcamp
    })
})

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with ID: ${req.params.id}`, 404))
    }
    res.status(200).json({success: true})
})