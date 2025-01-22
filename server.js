// src/server.js
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

// Import routes
const imageRoutes = require('./src/routes/imageRoutes');

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use image-related routes
app.use('/api', imageRoutes);

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

/*
app.post('/api/analitzar-imatge', async function(req, res) {
    // verify params from request body
    if (!req.body.prompt || typeof req.body.prompt !== 'string') {
        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: prompt (must be string)'
        });
    }

    if (!req.body.images || !Array.isArray(req.body.images)) {
        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: images (must be array)'
        });
    }

    if (!req.body.images.every(img => typeof img === 'string')) {
        return res.status(400).send({
            status: 'error',
            message: 'All images must be base64 strings'
        });
    }

    if (typeof req.body.stream !== 'boolean') {
        return res.status(400).send({
            status: 'error',
            message: 'Invalid or missing parameter: stream (must be boolean)'
        });
    }

    const startTime = Date.now();

    try {
        if (req.body.stream) {
            const response = await ollama.post('/api/generate', {
                prompt: req.body.prompt || '',
                images: req.body.images || [],
                model: model,
                stream: true
            }, {
                responseType: 'stream'
            });

            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Transfer-Encoding', 'chunked');
    
            response.data.on('data', (chunk) => {
              console.log('Received chunk:', chunk.toString());
              const json = JSON.parse(chunk);
              const description = json.response;
              data = {
                description: description,
                model_used: model
              };
              res.write(JSON.stringify(data));
            });
        
            response.data.on('end', () => {
              const processingTime = ((Date.now() - startTime) / 1000).toFixed(2);
              
              console.log('Stream ended');
              res.write(JSON.stringify({
                status: 'success',
                message: 'Image analysis complete',
                data: {
                  processing_time: processingTime,
                  model_used: model
                }
              }));
              res.end();
            });
        
            response.data.on('error', (error) => {
              console.error('Error in stream:', error);
              res.status(500).send({
                status: 'error',
                message: 'Error processing request',
                error: error.message
              });
            });
        } else {
            const response = await ollama.post('/api/generate', {
                prompt: req.body.prompt,
                images: req.body.images,
                model: model,
                stream: false
            });

            const processingTime = ((Date.now() - startTime) / 1000).toFixed(2);
            
            res.status(200).send({
                status: 'success',
                message: 'Image analysis complete',
                data: {
                    description: response.data.response,
                    processing_time: processingTime,
                    model_used: model
                }
            });
        }
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Error processing request',
            error: error.message
        });
    }
});*/