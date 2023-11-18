const express = require('express');
const { ApiMonitorSDK } = require('ajent');
 // Importing your local npm package
const winston = require('winston'); // For logging

// Initialize winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

const app = express();

app.use(express.json());
app.use(express.text());

// Initialize your local npm package
try {
  ApiMonitorSDK.init({
    url: "http://localhost:8080",
    applicationName: "service-name3",
    teamName:"team1",
    environment: "your-environment",
    partnerId: "NODEMAN",
    authKey:"test123",
    loggingEnabled:"true",
    app:app
  });
  app.use(ApiMonitorSDK.capture());
  logger.info('ApiMonitorSDK initialized successfully');
} catch (error) {
  logger.error(`ApiMonitorSDK initialization failed: ${error}`);
}

app.get('/', (req, res) => {
  res.send('Hello, world1!');
});
app.get('/2', (req, res) => {
  res.send('Hello, world2!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
