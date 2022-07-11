import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      minLength: 5,
    },
    username: {
      type: String,
      required: true,
      minLength: 5,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },

    registeredDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default model('users', userSchema);
