const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userRegistrationController');
const validateRegistrationUser = require('../middlewares/validateRegistrationUser');
const { sendSMS } = require('../controllers/sendSMSController');
const validateSendSMS = require('../middlewares/validateSendSMS');


// Post route for analyzing image
router.post('/registrar',validateRegistrationUser, registerUser);
router.get('/sendsms', validateSendSMS, sendSMS);

module.exports = router;
