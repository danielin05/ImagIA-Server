const axios = require('axios');

const url = 'http://localhost:3001/api/admin/usuaris/login';

const headers = {
    'Content-Type': 'application/json'
};

const payload = {
    username: "admin",
    password: "password"
};

axios.post(url, payload, { headers })
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });