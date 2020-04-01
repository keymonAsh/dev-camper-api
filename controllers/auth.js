const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/asyncHandeler')
const User = require('../models/user')

exports.register = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true
    })
})