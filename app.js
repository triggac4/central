import express from 'express';
import config from './config/default.js';
import logger from './src/utils/logger.js';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { connectDB } from './src/database/mongoose.js';
import socketConnect from './src/utils/socket/socket.js';

const app = express();
const port = config.port;

// setup helmet
// Helmet includes a whopping 12 packages that all work to block malicious parties
// from breaking or using an application to hurt its users
app.use(helmet());

//Body Parser
app.use(express.json());

// log only 4xx and 5xx responses to console
const logFormat =
  process.env.NODE_ENV == 'production' ? 'combined' : 'development';
app.use(
  morgan(logFormat, {
    skip(req, res) {
      return res.statusCode < 500;
    },
  })
);

// Enable CORS
app.use(
  cors({
    origin: (origin, cb) => {
      const allowed_origins = config.allowed_origins;
      if (allowed_origins.trim() == '*') {
        cb(null, true);
      } else {
        const origins = allowed_origins.split(',');
        if (origins.indexOf(origin) != -1 || !origin) {
          cb(null, true);
        } else {
          cb(new Error(`Origin('${origin}') not allowed`, false));
        }
      }
    },
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

//websocket setup
const socket = socketConnect(app);

//Base URL
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API v1  is running',
    env: config.env,
    project: config.project,
  });
});

//TODO: remove this
//how to use websocket
//syntax of sending rtc message to a particular room
//everybody listening to room-123 will receive the message
//this way all checks can be done on the controller
//front-end only listens to rooms
// app.get("/sendMessage",(req,res)=>{
//   const IO=req.app.get('IO');
//   IO.sockets.emit('room-123','message from server');
//   res.status(200).json({
//     message: 'message sent'
//   });
// });

socket.listen(port, async () => {
  logger.info('connecting to database ...');
  await connectDB();
  logger.info(`server is listening on port ${port}`);
});
