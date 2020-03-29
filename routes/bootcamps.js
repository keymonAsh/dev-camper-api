const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
    res.status(200).json({ succsess: true })
})

router.post('/', function(req, res) {
    res.status(200).json({ succsess: true })
})

router.get('/:id', function(req, res) {
    res.status(200).json({ succsess: true })
})

router.put('/:id', function(req, res) {
    res.status(200).json({ succsess: true })
})

router.delete('/:id', function(req, res) {
    res.status(200).json({ succsess: true })
})

module.exports = router