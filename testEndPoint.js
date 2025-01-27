const axios = require('axios');

const url = 'http://localhost:3001/api/analitzar-imatge';

const headers = {
    'Content-Type': 'application/json'
};

const payload = {
    prompt: 'This is a test prompt',
    images: [],
    stream: false
};

axios.post(url, payload, { headers })
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });