const axios = require('axios');

const ollama = axios.create({
    baseURL: process.env.OLLAMA_URL,
    headers: { 'Content-Type': 'application/json' }
});

const model = process.env.DEFAULT_MODEL;

module.exports = { ollama, model };

