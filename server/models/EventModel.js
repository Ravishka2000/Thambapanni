import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    industries: {
        type: [String],
        required: true
    },
    heritages: {
        type: [String],
        required: false
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
export default Event;
