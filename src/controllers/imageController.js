const { ollama, model } = require('../config/config');
const User = require('../bbdd/models/user');
const Image = require('../bbdd/models/images');
const Request = require('../bbdd/models/request');
const logCreation = require('../middlewares/logsCreation');

async function analyzeImage(req, res) {
    console.log('Analyzing image');
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
                const data = {
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

            const user = await User.findOne({
                attributes: ['id'],
                where: {
                    apiKey: req.headers['authorization'].split(' ')[1]
                }
            })

            const saveReq = await Request.create({
                userId: user.id,
                prompt: req.body.prompt,
                stream: false
            })

            logCreation("Request Created", JSON.stringify(saveReq.toJSON()), "analitzar-imagte", true);

            // Guardar registro imagen
            const saveImg = await Image.create({
                base64: req.body.images[0],
                description: response.data.response,
                requestId: saveReq.id
            });

            logCreation("Image Saved", JSON.stringify(saveImg.toJSON()), "analitzar-imagte", true);

            const processingTime = ((Date.now() - startTime) / 1000).toFixed(2);
            user.availableQuota -= 1;
            await user.save();
            res.status(200).send({
                status: 'success',
                message: 'Image analysis complete',
                data: {
                    description: response.data.response,
                    processing_time: processingTime,
                    model_used: model,
                    currentQuota: user.availableQuota
                }
            });
        }
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Error processing request',
            error: error.message
        });
        console.error(error);

        logCreation("ERROR", "Error processing request", "analitzar-imagte", false);
    }
}

module.exports = { analyzeImage };