const axios = require('axios');

const url = 'http://localhost:3001/api/admin/usuaris/plan';
const adminkey = 'dsmzj38qe2paw772'

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${adminkey}`
};

const payload = {
    plan: 'Premium',
    id: '2'
};

axios.post(url, payload, { headers })
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });