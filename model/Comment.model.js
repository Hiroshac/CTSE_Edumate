import mongoose from 'mongoose'
const Comment = new mongoose.Schema({
  note_id: {
    type: String,
  },
  studentName: {
    type: String,
  },
  comment: {
    type: String,
  },
  teacher_id: {
    type: String,
  },
})

export default mongoose.model('comments', Comment)
