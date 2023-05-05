import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },

}, { timestamps: true });

const postModel = mongoose.model('Post', postSchema);

export default postModel;