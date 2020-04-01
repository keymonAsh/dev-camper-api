const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/asyncHandeler')
const User = require('../models/user')

exports.register = asyncHandler(async (req, res, next) => {
    const {name, email, password, role} = req.body
    const user = await User.create({
        name,
        password,
        email,
        role
    })
    sendTokenResponse(user, 200, res)
    // res.status(statuscode).cookie('token', token, options).json({
    //     success: true,
    //     token
    // })
})

exports.login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body
    if(!email || !password) {
        return next(new ErrorResponse('Please provide an Email and Password', 400))
    }
    const user = await User.findOne({ email }).select('+password')
    if(!user) {
        next(new ErrorResponse('Invalid Credentials', 401))
    }
    const isMatch = await user.matchPassword(password)
    if(!isMatch) {
        next(new ErrorResponse('Invalid Credentials', 401))
    }
    sendTokenResponse(user, 200, res)
    // res.status(statuscode).cookie('token', token, options).json({
    //     success: true,
    //     token
    // })
})

exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        data: user
    })
})

const sendTokenResponse = (user, statuscode, res) => {
    const token = user.getSignedJwtToken()
    const options = {
        expires: new Date(Date.now + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(statuscode).cookie('token', token, options).json({
        success: true,
        token
    })
}