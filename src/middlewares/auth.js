import Jwt from 'jsonwebtoken';
import config from '../../config/default.js';

import { failureResponse } from '../helpers/index.js';

const { jwtSecret, jwtIssuer } = config;

const auth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (token === undefined || token === null) {
      return res.status(401).json(failureResponse(401, 'Token is required'));
    }

    const jwtToken = token.split(' ')[1];

    const decoded = Jwt.verify(jwtToken, jwtSecret, { issuer: jwtIssuer });

    if (decoded === null || decoded === undefined) {
      return res.status(401).json(failureResponse(401, 'Invalid token'));
    }

    next();
  } catch (err) {
    return res.status(500).json(failureResponse(500, 'Internal Server Error'));
  }
};

export default auth;
