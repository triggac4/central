import mongoose from 'mongoose';

const course_materialSchema = mongoose.Schema(
  {
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'courses',
      required: true,
    },
    total_students: {
      type: Number,
      required: true,
    },
    total_teachers: {
      type: Number,
      required: true,
    },
    subjects: {
      type: String,
      ref: 'courses',
      required: true,
    },
    programme: {
      type: String,
      enum: ['Associate', 'Postgraduate', 'Bachelor'],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Course_Materials', course_materialSchema);
