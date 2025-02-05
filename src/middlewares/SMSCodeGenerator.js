function generateSMSCode() {
    const charset = '0123456789';
    const length = 6;
    let code = '';
    for (let i = 0; i < length; i++) {
        code += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return code;
}

module.exports = generateSMSCode;

console.log(generateSMSCode())