const Bootcamp = require('../models/bootcamp')

exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find()
        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
        })
    } catch (err) {
        res.status(400).json({success: false})
    }
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

exports.showBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)

        if(!bootcamp) {
            return  res.status(400).json({success: false})
        }

        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch (err) {
        res.status(400).json({success: false})
    }
}

exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true })
}

exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({ success: true })
}