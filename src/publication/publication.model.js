import { Schema, model} from "mongoose";

const publicationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    course:{
        type: String,
        requerid: true,
        ref: 'Course'
    },
    dateAt:{
        type: Date
    }
});

export default model ("Publication", publicationSchema);s