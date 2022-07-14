import mongoose from 'mongoose';

const roomUserSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  last_time_seen: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const roomSchema = mongoose.Schema(
  {
    room_users: [
      {
        type: roomUserSchema,
        required: true,
      },
    ],
    room_type: {
      type: String,
      default: 'private',
      enum: ['dm', 'private', 'public'],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Room', roomSchema);
