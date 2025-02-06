function validateAdminLogsRequest(req, res, next) {
    if (!req.body.messageFilter || typeof req.body.messageFilter !== 'string') {

        logCreation("ERROR", `Invalid or missing parameter: messageFilter (must be string)`, "logs/list", false);

        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: messageFilter (must be string)'
        });
    }
    if (!req.body.tagFilter || typeof req.body.tagFilter !== 'number') {

        logCreation("ERROR", `Invalid or missing parameter: tagFilter (must be number)`, "logs/list", false);

        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: tagFilter (must be number)'
        });
    }
    next();
}

module.exports = validateAdminLogsRequest;