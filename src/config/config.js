const axios = require('axios');

enviromantType = process.env.ENVIRONMENT;

const ollama = enviromantType === 'production' ? 
axios.create({
    baseURL: process.env.PRODUCTION_OLLAMA_URL,
    headers: { 'Content-Type': 'application/json' }
})
:
axios.create({
    baseURL: process.env.LOCAL_OLLAMA_URL,
    headers: { 'Content-Type': 'application/json' }
});

const model = enviromantType === 'production' ? 
process.env.PRODUCTION_MODEL :
process.env.LOCAL_MODEL;
const SMSApiToken = process.env.SMS_API_TOKEN;

async function testOllamaReachability() {
    console.log("testing ollama")
    try {
        const response = await ollama.get('/'); // Or use an appropriate endpoint
        console.log('Ollama is reachable:', response.status === 200);
    } catch (error) {
        console.error('Error reaching Ollama:', error);
    }
}

testOllamaReachability()

module.exports = { ollama, model, SMSApiToken};

