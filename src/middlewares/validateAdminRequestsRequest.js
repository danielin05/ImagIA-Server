function validateAdminRequestsRequest(req,res,next) {
    console.log(req.body)
    next()
}

module.exports = validateAdminRequestsRequest