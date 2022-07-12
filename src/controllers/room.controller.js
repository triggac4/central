import mongoose from 'mongoose';
import messageModel from '../database/models/message.model';
import roomModel from '../database/models/room.model';
import asyncWrapper from '../utils/asyncwrapper';

// TODO: move this to helper folder after merge
const ObjectId = mongoose.Types.ObjectId;
// Validator function
function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

('api/v1/user/:userID/rooms');
const getUserRooms = async (req, res) => {
  const userID = req.params.userID;
  if (!isValidObjectId(userID)) {
    return res.status(400).json({
      message: 'valid roomID is required',
    });
  }

  const rooms = await roomModel
    .find({ room_users: { $elemMatch: { user_id: userID } } })
    .sort({ room_type: -1 });

  if (!rooms) {
  }
  res.status(200).json({
    message: 'rooms fetched successfully',
    rooms: rooms,
  });
};
