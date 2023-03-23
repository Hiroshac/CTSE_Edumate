import mongoose from 'mongoose'
const Marks = new mongoose.Schema({
  answer_id: {
    type: String,
  },
  subject: {
    type: String,
  },
  grade: {
    type: String,
  },
  student_id: {
    type: String,
  },
  mark: {
    type: String,
  },
  comment: {
    type: String,
  },
  markedBy: {
    type:String,
  },
})

export default mongoose.model('marks', Marks)
