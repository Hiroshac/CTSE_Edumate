import mongoose from "mongoose";

const stream = new mongoose.Schema(
    {
    streamname : {
        type: String
    },
}
)

export default mongoose.model('streams', stream);

