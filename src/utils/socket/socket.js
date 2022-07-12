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

  io.on('connection', (socket) => {
    app.set('socket', socket);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  return server;
};

export default socketConnect;
