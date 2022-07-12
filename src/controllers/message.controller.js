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

('api/v1/rooms/:roomID/messages');
const getRoomMessages = async (req, res) => {
  const roomID = req.params.roomID;
  if (!isValidObjectId(roomID)) {
    return res.status(400).json({
      message: 'valid roomID is required',
    });
  }
  const messages = await messageModel
    .find({ room_id: roomID })
    .sort({ createdAt: -1 });

  if (!messages) {
  }
  res.status(200).json({
    message: 'Messages fetched successfully',
    messages: messages,
  });
};
