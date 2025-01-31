const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userRegistrationController');
const validateRegistrationUser = require('../middlewares/validateRegistrationUser');
const { sendSMS } = require('../controllers/sendSMSController');
const validateSendSMS = require('../middlewares/validateSendSMS');
const { validSMSCode } = require('../controllers/userRegistrationController');
const validateSMSCodeReques = require('../middlewares/validateSMSCodeRequest');


// Post route for analyzing image
router.post('/validar/validar-codi',validateSMSCodeReques, validSMSCode);
router.post('/registrar',validateRegistrationUser, registerUser);
router.get('/sendsms', validateSendSMS, sendSMS);

module.exports = router;
