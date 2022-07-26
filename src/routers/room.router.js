import express from 'express';
import passport from 'passport';
import roomController from '../controllers/room.controller.js';
import messageController from '../controllers/message.controller.js';

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  roomController.getUserRooms
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  roomController.createRoom
);

router
  .route('/:roomID/messages')
  .get(
    passport.authenticate('jwt', { session: false }),
    messageController.getRoomMessages
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    messageController.sendMessage
  );
router
  .route('/:roomID/messages/:messageID')
  .put(
    passport.authenticate('jwt', { session: false }),
    messageController.editMessage
  );

export default router;
