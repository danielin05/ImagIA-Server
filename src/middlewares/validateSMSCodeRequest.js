const logCreation = require('./logsCreation');

function validateSMSCodeRequest(req, res, next) {
    // Check if phone exists and is a string
    if (!req.body.phone || typeof req.body.phone !== 'string') {

        logCreation("ERROR", `Invalid or missing parameter: phone (must be string)`, "registrar", false);

        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: phone (must be string)'
        });
    }

    // Check if codi exists and is a string
    if (!req.body.codi ||  typeof req.body.codi !== 'string') {

        logCreation("ERROR", `Invalid or missing parameter: codi (must be string)`, "registrar", false);

        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: codi (must be string)'
        });
    }

    // If validation passes, proceed to the next middleware
    next();
}

module.exports = validateSMSCodeRequest;