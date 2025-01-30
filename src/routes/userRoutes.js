const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userRegistrationController');
const validateRegistrationUser = require('../middlewares/validateRegistrationUser');


// Post route for analyzing image
router.post('/registrar',validateRegistrationUser, registerUser);

module.exports = router;
