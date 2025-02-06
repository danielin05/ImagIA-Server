const logCreation = require('./logsCreation');

function generateKey() {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 16;
    let key = '';
    for (let i = 0; i < length; i++) {
        key += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    logCreation("Generate apiKey", `ApiKey generated: ${key}`, "validar/validar-codi", true)

    return key;
}

module.exports = {generateKey };

console.log(generateKey())