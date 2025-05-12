import { Schema, model } from "mongoose";

const commentarySchema = new Schema({
    publication: {  
        type: Schema.Types.ObjectId,
        ref: "Publication",
        required: true
    },
    author: {
        type: String,
        required: [true, "El nombre del autor es requerido"],
        trim: true,
        maxlength: [50, "El nombre no puede exceder 50 caracteres"]
    },
    content: {
        type: String,
        required: [true, "El contenido es requerido"],
        maxlength: [300, "El comentario no puede exceder 300 caracteres"]
    },
    dateAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    }
}, 
{
    versionKey: false,
    timestamps: true
})

commentarySchema.methods.toJSON = function () {
    const { __v, status, ...commentary } = this.toObject();
    return commentary;
};

export default model("Commentary", commentarySchema);