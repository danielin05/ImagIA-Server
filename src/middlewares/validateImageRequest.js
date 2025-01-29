function validateImageRequest(req, res, next) {
    // Check if prompt exists and is a string
    if (!req.body.prompt || typeof req.body.prompt !== 'string') {
        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: prompt (must be string)'
        });
    }

    // Check if images exist and are an array
    if (!req.body.images || !Array.isArray(req.body.images)) {
        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: images (must be array)'
        });
    }

    // Check if all images are base64 strings
    if (!req.body.images.every(img => typeof img === 'string')) {
        return res.status(400).send({
            status: 'error',
            message: 'All images must be base64 strings'
        });
    }

    // Check if stream exists and is a boolean
    if (typeof req.body.stream !== 'boolean') {
        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: stream (must be boolean)'
        });
    }

    // If validation passes, proceed to the next middleware
    next();
}
module.exports = validateImageRequest;
