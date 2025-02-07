function validateAdminLogsRequest(req, res, next) {
    console.log(req.body)
    if (req.body.messageFilter === undefined || req.body.messageFilter === null || typeof req.body.messageFilter !== 'string') {
        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: messageFilter (must be string)'
        });
    }
    if (req.body.tagFilter === undefined || req.body.tagFilter === null || typeof req.body.tagFilter !== 'string') {
        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: tagFilter (must be string)'
        });
    }
    next();
}

module.exports = validateAdminLogsRequest;