function validateRegistrationUser(req, res, next) {
    // Check if prompt exists and is a string
    if (!req.body.phone || typeof req.body.phone !== 'string') {
        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: phone (must be string)'
        });
    }

    // Check if images exist and are an array
    if (!req.body.nickname ||  typeof req.body.nickname !== 'string') {
        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: nickname (must be string)'
        });
    }

    // Check if all images are base64 strings
    if (!req.body.email ||  typeof req.body.email !== 'string') {
        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: email (must be string)'
        });
    }

    // If validation passes, proceed to the next middleware
    next();
}
module.exports = validateRegistrationUser;
