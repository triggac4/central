import userModel from '../database/models/users.model.js';
import { userCreateValidation } from '../database/validation/users.validation.js';
import bcrypt from 'bcrypt';

import { successResponse, failureResponse } from '../helpers/apiResponse.js';

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
        .json(failureResponse(400, 'A user exists with the email provided 1'));
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

    const { password, ...dataToReturn } = newUser._doc;

    return res
      .status(200)
      .json(successResponse(201, dataToReturn, 'User create successfully'));
  } catch (error) {
    return res.status(500).json(failureResponse(500, error.message));
  }
};
