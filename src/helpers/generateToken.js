import JWT from 'jsonwebtoken';
import config from '../../config/default.js';

const { jwtIssuer, jwtSecret } = config;

export const generateToken = (user) => {
  return JWT.sign(
    {
      sub: user._id,
      Issuer: jwtIssuer,
    },
    jwtSecret,
    { expiresIn: '1h' }
  );
};

export default generateToken;
