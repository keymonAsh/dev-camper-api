const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandeler')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/user')

exports.protect = asyncHandler(async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    } else if(req.cookies.token) {
        token = req.cookie.token
    }
    if(!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401))
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        req.user = await User.findById(decoded.id)
        next()
    } catch (err) {
        return next(new ErrorResponse('Not authorized to access this route', 401))
    }
})

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles,includes(req.user.roles)) {
            return next(new ErrorResponse(`USer role ${req.user.role} is not autherized`, 403))
        }
    }
}