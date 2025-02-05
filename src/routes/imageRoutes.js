const express = require('express');
const router = express.Router();
const { analyzeImage } = require('../controllers/imageController');
const validateImageRequest = require('../middlewares/validateImageRequest');
const validateKey = require('../middlewares/validateKey');


// Post route for analyzing image
router.post('/analitzar-imatge',validateKey, validateImageRequest, analyzeImage);

module.exports = router;
