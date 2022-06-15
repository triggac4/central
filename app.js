import express from 'express';
import config from './config/default.js';
import logger from './src/utils/logger.js';

const app = express();
const port = config.port;

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API v1  is running',
    env: config.env,
    project: config.project,
  });
});

app.listen(port, () => {
  logger.info(`server is listening on ${port}`);
});
