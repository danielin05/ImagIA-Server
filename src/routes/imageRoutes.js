const express = require('express');
const router = express.Router();
const { analyzeImage } = require('../controllers/imageController');
const validateImageRequest = require('../middlewares/validateImageRequest');


// Post route for analyzing image
router.post('/analitzar-imatge',validateImageRequest, analyzeImage);

module.exports = router;
