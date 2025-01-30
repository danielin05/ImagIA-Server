const axios = require('axios');

const url = 'http://localhost:3001/api/usuaris/registrar';

const headers = {
    'Content-Type': 'application/json'
};

const payload = {
    phone: "+34 600806993",
    nickname: "Daniel",
    email: "danielarpe05@gmail.com"
};

axios.post(url, payload, { headers })
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });