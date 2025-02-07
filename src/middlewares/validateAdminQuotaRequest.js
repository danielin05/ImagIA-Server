const logCreation = require('./logsCreation');

function validateAdminQuotaRequest(req,res,next) {
    if (!req.body.quota || typeof req.body.quota !== 'string') {
        
        logCreation("ERROR", `Invalid or missing parameter: quota (must be string)`, "usuaris/quota", false);

        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: quota (must be string)'
        });
    }
    if (!req.body.id || typeof req.body.id !== 'string') {

        logCreation("ERROR", `Invalid or missing parameter: id (must be string)`, "usuaris/quota", false);

        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: id (must be string)'
        });
    }
    next()
}

module.exports = validateAdminQuotaRequest