import mongoose from 'mongoose'

const teacherNotesSchema = new mongoose.Schema({
  note: {
    type: String,
  },
  stream: {
    type: String,
  },
  subject: {
    type: String,
  },
  lesson_name: {
    type: String,
  },
  grade: {
    type: Number,
  },
  teacher_id: {
    type: String,
  },
})

export default mongoose.model('teacherNotes', teacherNotesSchema)
