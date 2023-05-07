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
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    location: {
        type: String,
    },
    ratings: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        }
    }],
    comments: [{
        id: {
            type: String,
            unique: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        text: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    disLikes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    isLiked: {
        type: Boolean,
        default: false
    },
    isDisliked: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const postModel = mongoose.model('Post', postSchema);

export default postModel;