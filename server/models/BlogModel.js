import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    images: [],
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        required: true
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
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
