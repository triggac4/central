import jwt from 'jsonwebtoken';

import config from '../../config/default.js';
import User from '../database/models/users.model.js';
import { userCreateValidation } from '../database/validation/users.validation.js';

import {
  successResponse,
  failureResponse,
  sendConfirmationEmail,
} from '../helpers/index.js';

const { jwtSecret, jwtIssuer } = config;

export const createUser = async (req, res) => {
  const { fullName, username, password: userPassword, email } = req.body;

  try {
    const { error } = userCreateValidation.validate(req.body);

    if (error !== undefined) {
      return res
        .status(400)
        .json(failureResponse(400, error.details[0].message));
    }

    const userByEmail = await User.findOne({ email: email });

    if (userByEmail !== null) {
      console.log(userByEmail);
      return res
        .status(400)
        .json(failureResponse(400, 'A user exists with the email provided'));
    }

    const userByUsername = await User.findOne({ username: username });

    if (userByUsername !== null) {
      return res
        .status(400)
        .json(failureResponse(400, 'A user exists with the username provided'));
    }

    const newUser = await User.create({
      fullName,
      username,
      email,
      password: userPassword,
    });

    if (newUser === null) {
      return res
        .status(400)
        .json(
          failureResponse(
            400,
            'Unable to create a new user with the data provided'
          )
        );
    }

    const { password, emailConfirmed, isActive, ...dataToReturn } =
      newUser._doc;

    await sendConfirmationEmail({ ...dataToReturn, id: dataToReturn._id });

    const tokenData = {
      sub: dataToReturn._id,
      Issuer: jwtIssuer,
    };

    const token = jwt.sign(tokenData, jwtSecret, { expiresIn: '1h' });

    const response = {
      token: `Bearer ${token}`,
      userId: dataToReturn._id,
    };

    return res
      .status(200)
      .json(successResponse(201, response, 'User create successfully'));
  } catch (error) {
    return res.status(500).json(failureResponse(500, error.message));
  }
};

export const signinUser = async (req, res) => {
  try {
    const { user, password } = req.body;

    if (user === undefined || password === undefined) {
      return res
        .status(400)
        .json(
          failureResponse(
            404,
            'Fields user and password are required for signin'
          )
        );
    }

    const userExist = await User.findOne({
      $or: [{ email: user }, { username: user.username }],
    });

    if (userExist === null) {
      return res
        .status(404)
        .json(
          failureResponse(404, 'No user with the user name or email provided')
        );
    }
    const passwordCorrect = await bcrypt.compare(password, userExist.password);

    if (!passwordCorrect) {
      return res.status(400).json(failureResponse(400, 'Incorrect password'));
    }

    const data = {
      sub: userExist._id,
      issuer: jwtIssuer,
    };

    const token = jwt.sign(data, jwtSecret, { expiresIn: '1h' });

    const response = {
      token: `Bearer ${token}`,
      userId: data.id,
    };

    return res.status(200).json(successResponse(200, response));
  } catch (err) {
    return res.status(500).json(failureResponse(500, err.message));
  }
};
