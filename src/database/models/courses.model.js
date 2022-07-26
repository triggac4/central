import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
  course_code: {
    type: String,
    required: true,
    maxLength: 4,
  },
  course_name: {
    type: String,
    required: true,
  },
});

export default mongoose.model('courses', courseSchema);
