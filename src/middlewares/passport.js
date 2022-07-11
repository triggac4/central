import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import config from '../../config/default.js';
import User from '../database/models/users.model.js';

const { jwtSecret } = config;

export const applyPassportJwtStrategy = (passport) => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret,
      },
      async (payload, done) => {
        try {
          const user = await User.findById(payload.sub);

          if (!user) {
            return done(null, false);
          }

          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
};
