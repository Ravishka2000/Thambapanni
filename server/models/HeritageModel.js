import mongoose from "mongoose";
const Schema = mongoose.Schema;

const heritageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type:String
    },
});

const Heritage = mongoose.model('Heritage', heritageSchema);

export default Heritage;

