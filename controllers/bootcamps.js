const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/asyncHandeler')
const Bootcamp = require('../models/bootcamp')

// SHOW ALL
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const reqQuery = { ...req.query } // copy of req.query
    const removeFields = ['select', 'sort', 'page', 'limit']
    removeFields.forEach(param => delete reqQuery[param])

    let queryStr = JSON.stringify(reqQuery) // for creating the operator
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    let query = Bootcamp.find(JSON.parse(queryStr)).populate('courses')

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

    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 25
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await Bootcamp.countDocuments()
    query.skip(startIndex).limit(limit)

    const bootcamps = await query

    const pagination = {}
    if(endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if(startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        pagination: pagination,
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
    const bootcamp = await Bootcamp.findById(req.params.id)
    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with ID: ${req.params.id}`, 404))
    }
    bootcamp.remove()
    res.status(200).json({success: true})
})