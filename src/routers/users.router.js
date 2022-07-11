import express from 'express';
import passport from 'passport';

const router = express.Router();

import { createUser, signinUser } from '../controllers/users.controller.js';

router.post('/signup', createUser);
router.post('/signin', signinUser);

export default router;
