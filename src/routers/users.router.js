import express from 'express';

const router = express.Router();

import { createUser } from '../controllers/users.controller.js';

router.post('/signup', createUser);

export default router;
