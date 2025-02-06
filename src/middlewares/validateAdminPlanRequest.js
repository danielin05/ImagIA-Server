const logCreation = require('./logsCreation');

function validateAdminPlanRequest(req,res,next) {
    if (!req.body.plan || typeof req.body.plan !== 'string') {
        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: plan (must be string)'
        });
    }
    if (!req.body.id || typeof req.body.id !== 'string') {
        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: id (must be string)'
        });
    }
    next()
}

module.exports = validateAdminPlanRequest