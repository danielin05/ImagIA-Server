const Log = require('../bbdd/models/logs');


async function logCreation(tag, message, endpoint, status) {

    const saveLog = await Log.create({
        tag: tag,
        message: message,
        endpoint: endpoint,
        status: status
    })
    
    console.log(saveLog.toJSON());
}

module.exports = logCreation