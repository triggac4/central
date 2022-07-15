import mongoose from 'mongoose';
import messageModel from '../database/models/message.model.js';
import roomModel from '../database/models/room.model.js';
import asyncWrapper from '../utils/asyncwrapper.js';
import usersModel from '../database/models/users.model.js';

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

('rooms/:userID/rooms');
const getUserRooms = async (req, res) => {
  const userID = req.params.userID;
  if (!isValidObjectId(userID)) {
    return res.status(400).json({
      message: 'valid roomID is required',
    });
  }
  console.log('user', req.user);
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

('rooms/');
const createRoom = async (req, res) => {
  const { room_type, room_users } = req.body;

  if (!room_type || !room_users) {
    return res.status(400).json({
      message: 'room_type and room_users are required',
    });
  }

  if (!Array.isArray(room_users)) {
    return res.status(400).json({
      message: 'room_users must be an array of usersID',
    });
  }

  const roomUserDetails = [];
  const formattedUsers = await Promise.all(
    room_users.map(async (item) => {
      const User = await usersModel.findById(item);
      if (!User) {
        throw new Error('user not found');
      }
      roomUserDetails.push(User);
      return {
        user_id: item,
        last_time_seen: new Date(),
      };
    })
  );

  if (room_type) {
    switch (room_type) {
      case 'dm':
        if (room_users?.length < 2) {
          return res.status(400).json({
            message: 'room_users must be at least 2',
          });
        }
        break;
      case 'private':
        if (room_users?.length < 1) {
          return res.status(400).json({
            message: 'room_users must be at least 1',
          });
        }
    }
  }
  const room = await roomModel.create({
    room_type,
    room_users: formattedUsers,
  });

  if (!room) {
    return res.status(400).json({
      message: 'room not created',
    });
  }
  res.status(200).json({
    message: 'room created successfully',
    room: room,
    roomUsers: roomUserDetails,
  });
};

const updateRoomLastSeen = async (req, res) => {};
export default { getUserRooms, createRoom };
