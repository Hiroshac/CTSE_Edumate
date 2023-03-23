
import mongoose from 'mongoose'

const studentanswersschema = new mongoose.Schema({
  image: {
    type: String,
  },
  stream: {
    type: String,
  },
  subject: {
    type: String,
  },
  lname: {
    type: String,
  },
  grade: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  student_id: {
    type: String,
  },
  status: {
    type: String,
  },
})

export default mongoose.model('studentanswers', studentanswersschema)
