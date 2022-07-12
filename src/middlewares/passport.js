import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import config from '../../config/default.js';
import User from '../database/models/users.model.js';
import { failureResponse } from '../helpers/index.js';

const { jwtSecret, jwtIssuer } = config;

export const applyPassportJwtStrategy = (passport) => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret,
      },
      async (payload, done) => {
        try {
          if (payload.issuer !== jwtIssuer) {
            return done(null, false);
          }
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

export const applyPassportLocalStrategy = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'user' },
      async (user, password, done) => {
        try {
          const userExist = await User.findOne({
            $or: [{ email: user }, { username: user }],
          });

          if (!userExist) {
            return done(null, false);
          }

          const isMatch = await userExist.isValidPassword(password);

          if (!isMatch) {
            return done(null, false);
          }

          return done(null, userExist);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
};
