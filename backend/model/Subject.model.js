import mongoose from "mongoose";

const subject = new mongoose.Schema(
    {
    streamname : {
        type: String
    },
    subjectname : {
        type: String
    },
}
)

export default mongoose.model('subjects', subject);
