const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');


const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
dotenv.config();
console.log('Current directory:', process.cwd());
console.log('__dirname:', __dirname);
// Import routes
const imageRoutes = require('./src/routes/imageRoutes');
const userRoutes = require('./src/routes/userRoutes')
const adminRoutes = require('./src/routes/adminRoutes')

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use image-related routes
app.use('/api', imageRoutes);

// Use users-related routes
app.use('/api/usuaris', userRoutes)

// Use admin-related routes
app.use('/api/admin', adminRoutes)
// Task setup
const scheduleTask = require('./src/tasks/scheduleTask');
const resetQuotaTask = require('./src/tasks/resetQuotaTask');

// Schedule tasks
scheduleTask(resetQuotaTask);

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});