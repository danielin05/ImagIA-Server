const axios = require('axios');

const url = 'http://localhost:3001/api/analitzar-imatge';
const adminkey = 'dsmzj38qe2paw772'

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer dsmzj38qe2paw772'
};

const payload = {
    phone: '123456789',
    nickname: "Danielin",
    email: "danielin@gmail.com"
};

axios.post(url, payload, { headers })
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });