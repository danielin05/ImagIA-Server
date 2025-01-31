const {SMSApiToken} = require('../config/config')

async function sendSMS(req, res) {
    console.log('Processing SMS request...');
    const { username, SMSApiToken, receiver, text } = req.query;

    try {
        // Aquí iría la lógica para enviar el SMS
        console.log(`Sending SMS to ${receiver}: "${text}"`);

        res.status(200).json({
            status: "Success",
            message: "SMS sent successfully",
            data: { username, receiver, text }
        });

    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).json({ status: "ERROR", message: "Failed to send SMS" });
    }
}

module.exports = { sendSMS };