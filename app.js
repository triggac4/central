import express from 'express';
import config from './config/default.js';
import logger from './src/utils/logger.js';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import 'express-async-errors';

import errorHandler from './src/middlewares/error_handler.js';
import { connectDB } from './src/database/mongoose.js';
import socketConnect from './src/utils/socket/socket.js';

import usersRoute from './src/routers/users.router.js';
//import generateTokenRoute from './src/routers/generatetoken.router.js';
import {
  applyPassportJwtStrategy,
  applyPassportLocalStrategy,
} from './src/middlewares/passport.js';
import { failureResponse } from './src/helpers/apiResponse.js';
import unknownRoute from './src/middlewares/unkown_route.js';
import roomRoute from './src/routers/room.router.js';

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

applyPassportJwtStrategy(passport);
applyPassportLocalStrategy(passport);

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

app.use('/accounts', usersRoute);
app.use('/rooms', roomRoute);
app.use(unknownRoute, errorHandler);

socket.listen(port, async () => {
  logger.info('connecting to database ...');
  await connectDB();
  logger.info(`server is listening on port ${port}`);
});