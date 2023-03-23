import mongoose from "mongoose";

const subjectfeedbackschema = new mongoose.Schema(
    {
    subjectname : {
        type: String
    },
    Comment : {
        type: String
    },
})
export default mongoose.model('subjectsfeedback', subjectfeedbackschema);
