import mongoose from 'mongoose'
const LinkSchema = new mongoose.Schema({
  stream:{
      type:String
  },
  subject: {
    type: String,
    required: true,
  },
  lesson_name: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  teacher_id: {
    type: String,
    required: true,
  },
})

export default mongoose.model('link', LinkSchema)
