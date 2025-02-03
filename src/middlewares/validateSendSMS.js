function validateSendSMS(req, res, next) {

    if (!req.body.phone || typeof req.body.phone !== 'string') {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid or missing parameter: phone (must be string)'
        });
    }

    next();
}

module.exports = validateSendSMS;