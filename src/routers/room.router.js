import express from 'express';
import passport from 'passport';
import roomController from '../controllers/room.controller.js';

const router = express.Router();

router.get(
  '/:userID',
  passport.authenticate('jwt', { session: false }),
  roomController.getUserRooms
);

export default router;
