import mongoose from 'mongoose';

const messageSchema = mongoose.Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    messageType: {
      type: String,
      default: 'text',
      enum: ['text', 'image', 'video', 'file'],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
