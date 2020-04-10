const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/asyncHandeler')
const Bootcamp = require('../models/bootcamp')

// SHOW ALL
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})

// CREATE
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    req.body.user = req.user.id
    const publishedBootcamp = await Bootcamp.findOne({user: req.user.id})
    if(publishedBootcamp && req.user.role !== 'admin') {
        return next(new ErrorResponse(`The user with ID ${req.user.id} has already published a bootcamp`))
    }
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({
        success: true,
        data: bootcamp
    })
})

// SHOW BY ID
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

// UPDATE
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    let bootcamp = await Bootcamp.findById(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with ID: ${req.params.id}`, 404))
    }
    if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User with ID: ${req.params.id} is not autherized`, 401))
    }

    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body , {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: bootcamp
    })
})

// DELETE
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with ID: ${req.params.id}`, 404))
    }
    if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User with ID: ${req.params.id} is not autherized`, 401))
    }
    bootcamp.remove()
    res.status(200).json({success: true})
})