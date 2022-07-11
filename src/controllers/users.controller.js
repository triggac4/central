import userModel from '../database/models/users.model.js';
import { userCreateValidation } from '../database/validation/users.validation.js';
import bcrypt from 'bcrypt';

import {
  successResponse,
  failureResponse,
  sendConfirmationEmail,
} from '../helpers/index.js';

export const createUser = async (req, res) => {
  const { fullName, username, password: userPassword, email } = req.body;

  try {
    const { error } = userCreateValidation.validate(req.body);

    if (error !== undefined) {
      return res
        .status(400)
        .json(failureResponse(400, error.details[0].message));
    }

    const userByEmail = await userModel.findOne({ email: email });

    if (userByEmail !== null) {
      console.log(userByEmail);
      return res
        .status(400)
        .json(failureResponse(400, 'A user exists with the email provided'));
    }

    const userByUsername = await userModel.findOne({ username: username });

    if (userByUsername !== null) {
      return res
        .status(400)
        .json(failureResponse(400, 'A user exists with the username provided'));
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = await userModel.create({
      fullName,
      username,
      email,
      password: hashedPassword,
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

    return res
      .status(200)
      .json(successResponse(201, dataToReturn, 'User create successfully'));
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
            'Fields user and password are requird for signin'
          )
        );
    }

    const userExist = await userModel.findOne({
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

    return res.status(200).json(successResponse(200, userExist));
  } catch (err) {
    return res.status(500).json(failureResponse(500, err.message));
  }
};
