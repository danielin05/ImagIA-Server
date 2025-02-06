function validateAdminLogsRequest(req, res, next) {
    if (!req.body.messageFilter || typeof req.body.messageFilter !== 'string') {
        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: messageFilter (must be string)'
        });
    }
    if (!req.body.tagFilter || typeof req.body.tagFilter !== 'number') {
        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: tagFilter (must be number)'
        });
    }
    next();
}

module.exports = validateAdminLogsRequest;