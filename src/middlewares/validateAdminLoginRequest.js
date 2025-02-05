function validateAdminLoginRequest(req, res, next) {
    if (!req.body.username || typeof req.body.username !== 'string') {
        return res.status(400).send({
            status: 'error', 
            message: 'Invalid or missing parameter: username (must be string)' 
        });
    }

    if (!req.body.password || typeof req.body.password !== 'string') {
        return res.status(400).send({ 
            status: 'error',
            message: 'Invalid or missing parameter: password (must be string)'
        });
    }

    next();
}

module.exports = validateAdminLoginRequest;