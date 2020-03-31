const advancedResults = (model, populate) => async (req, res, next) => {
    const reqQuery = { ...req.query } // copy of req.query
    const removeFields = ['select', 'sort', 'page', 'limit']
    removeFields.forEach(param => delete reqQuery[param])

    let queryStr = JSON.stringify(reqQuery) // for creating the operator
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    let query = model.find(JSON.parse(queryStr)).populate('courses')

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
    const total = await model.countDocuments()
    query.skip(startIndex).limit(limit)

    if(populate) {
        query = query.populate(populate)
    }

    const results = await query

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

    res.advancedResults = {
        success: true,
        count: results.length,
        data: results
    }

    next()
}

module.exports = advancedResults