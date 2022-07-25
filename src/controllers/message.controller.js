import mongoose from 'mongoose';
import messageModel from '../database/models/message.model';
import roomModel from '../database/models/room.model';
import socketEvents from '../utils/socket/socketEvents';
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

('api/v1/rooms/:roomID');
const sendMessage = async (req, res) => {
  const { roomID } = req.params;
  const { content, messageType } = req.body;
  if (!isValidObjectId(roomID)) {
    return res.status(400).json({
      message: 'valid roomID is required',
    });
  }
  const room = roomModel.findById(roomID);
  if (!room) {
    return res.status(400).json({
      message: 'room not found',
    });
  }
  const message = await messageModel.create({
    sender_id: req.user._id,
    content,
    messageType,
    room_id: roomID,
  });

  if (!message) {
    return res.status(400).json({
      message: 'something went wrong',
    });
  }
  const IO = req.app.get('IO');
  IO.sockets.emit(
    roomID,
    socketEvents.newMessage(message._id, req.user, message)
  );

  res.status(200).json({
    message: 'Message sent successfully',
    messages: message,
  });
};

('api/v1/rooms/:roomID/messages/:messageID');
const editMessage = async (req, res) => {
  const { roomID, messageID } = req.params;
  const { content, messageType } = req.body;
  if (!isValidObjectId(roomID) || !isValidObjectId(messageID)) {
    return res.status(400).json({
      message: 'valid roomID is required',
    });
  }
  const room = roomModel.findById(roomID);
  if (!room) {
    return res.status(400).json({
      message: 'room not found',
    });
  }
  //TODO: check if sender is in the room
  //might move this to a middleware

  const message = await messageModel.findById(messageID);

  if (!message || !content || !messageType) {
    return res.status(400).json({
      message: 'something went wrong',
    });
  }

  message.content = content;
  message.messageType = messageType;

  if (message.sender_id !== req.user._id) {
    return res.status(400).json({
      message: 'you are not authorized to edit this message',
    });
  }
  const updatedMessage = await message.save();

  const IO = req.app.get('IO');
  IO.sockets.emit(
    roomID,
    socketEvents.editMessage(messageID, req.user, updatedMessage)
  );

  res.status(200).json({
    message: 'Message edited successfully',
    messages: message,
  });
};
