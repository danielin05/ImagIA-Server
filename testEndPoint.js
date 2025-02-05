const axios = require('axios');

const url = 'http://localhost:8000/api/sendsms/?api_token=9IaWFkuHTbW1inR6dQ6XuMeV3Fzlu9wGMNYLVaaMlgY98N4aXyWWfThW4kUcnuxR&username=ams24&text=prova+de+missatge+text+SMS&receiver=611698369';
const adminkey = 'dsmzj38qe2paw772'

const headers = {
};

const payload = {
};

axios.get(url, payload, { headers })
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });