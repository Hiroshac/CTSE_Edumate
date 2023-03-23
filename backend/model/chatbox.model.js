import mongoose from 'mongoose'
const chatbox = new mongoose.Schema({
     subject: {
        type: String,
      },
      stream: {
        type: String,
      },
      author: {
        type: String,
      },
      email: {
        type: String,
      },
      message: {
        type: String,
      },
      time: {
        type: String,
      },
})

export default mongoose.model('chatbox', chatbox)
