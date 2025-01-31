function validateSendSMS(req, res, next) {
    const { username, api_token, receiver, text } = req.query;

    if (!username || typeof username !== 'string') {
        return res.status(400).json({ status: 'error', message: 'Invalid or missing parameter: username (must be string)' });
    }

    if (!api_token || typeof api_token !== 'string') {
        return res.status(400).json({ status: 'error', message: 'Invalid or missing parameter: api_token (must be string)' });
    }

    if (!receiver || typeof receiver !== 'string' || !/^\d{9,15}$/.test(receiver)) {
        return res.status(400).json({ status: 'error', message: 'Invalid or missing parameter: receiver (must be a valid phone number)' });
    }

    if (!text || typeof text !== 'string') {
        return res.status(400).json({ status: 'error', message: 'Invalid or missing parameter: text (must be string)' });
    }

    next();
}

module.exports = validateSendSMS;