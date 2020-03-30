const Bootcamp = require('../models/bootcamp')

exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ succsess: true })
}

exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body)
        res.status(201).json({
            success: true,
            data: bootcamp
        })
    } catch (err) {
        res.status(400).json({success: false})
    }
}

exports.showBootcamp = (req, res, next) => {
    res.status(201).json({ succsess: true })
}

exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ succsess: true })
}

exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({ succsess: true })
}