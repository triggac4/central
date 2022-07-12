import { Server as socket } from 'socket.io';
import http from 'http';

const socketConnect = (app) => {
  const server = http.createServer(app);
  const io = new socket(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  });

  //incase anything needs to be done on connection
  io.on('connection', (socket) => {});

  app.set('IO', io);

  return server;
};

export default socketConnect;
