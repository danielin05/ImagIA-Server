const axios = require('axios');

const url = 'http://localhost:3001/api/usuaris/validar/validar-codi';
const adminkey = 'dsmzj38qe2paw772'

const headers = {
    'Content-Type': 'application/json',
};

const payload = {
    phone: '123457845',
    codi: '123456'
};

axios.post(url, payload, { headers })
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });