const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userRegistrationController');
const validateRegistrationUser = require('../middlewares/validateRegistrationUser');
const { validSMSCode } = require('../controllers/userRegistrationController');
const validateSMSCodeReques = require('../middlewares/validateSMSCodeRequest');


// Post route for analyzing image
router.post('/validar/validar-codi',validateSMSCodeReques, validSMSCode);
router.post('/registrar',validateRegistrationUser, registerUser);

module.exports = router;
