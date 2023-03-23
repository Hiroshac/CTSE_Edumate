import mongoose from 'mongoose'
const ExamTable = new mongoose.Schema({
  day: {
    type: Date,
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
  stream: {
    type: String,
  },
  subject: {
    type: String,
  },
  grade: {
    type: String,
  }
})

export default mongoose.model('ExamTable', ExamTable)
