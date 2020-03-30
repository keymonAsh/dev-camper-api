const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/asyncHandeler')
const Bootcamp = require('../models/bootcamp')

// SHOW ALL
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const reqQuery = { ...req.query } // copy of req.query
    const removeFields = ['select', 'sort']
    removeFields.forEach(param => delete reqQuery[param])

    let queryStr = JSON.stringify(reqQuery) // for creating the operator
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    let query = Bootcamp.find(JSON.parse(queryStr))

    if(req.query.select) { // Selecting fields for display
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }

    if(req.query.sort) { // Selecting fields for sort
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    } else {
        query = query.sort('-createdAt')
    }

    const bootcamps = await query

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
})

// CREATE
exports.createBootcamp = asyncHandler(async (req, res, next) => {
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

// DELETE
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with ID: ${req.params.id}`, 404))
    }
    res.status(200).json({success: true})
})