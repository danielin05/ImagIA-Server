const logCreation = require('./logsCreation');

const { User } = require('../bbdd/models');

async function validateKey(req, res, next) {
    const apiKey = req.headers['authorization'];
    if (!apiKey || typeof apiKey !== 'string' || apiKey.length != 16 + "Bearer ".length) {
        return res.status(401).json({
            status: 'error',
            message: 'Authorization header missing or incorrect format' 
        });
    }

    // Check if the API key is provided and matches the expected value
    if (!apiKey.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 'error',
            message: 'Authorization header missing or incorrect format' 
        });
    }
    
    const token = apiKey.split(' ')[1]; // Extract the token part
    
    // Assuming you have a function to validate the token
    const userExists = await User.count({
        where: {
            apiKey: token
        }
    });

    if (userExists > 0) {
        console.log('API key is valid');
        next();
    } else {
        console.log('API key is invalid');
        return res.status(403).json({
            status: 'error',
            message: 'Invalid API key'
        });
    }
}

module.exports = validateKey;
