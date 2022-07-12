import mongoose from 'mongoose';

const roomSchema = mongoose.Schema(
  {
    room_users: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
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
