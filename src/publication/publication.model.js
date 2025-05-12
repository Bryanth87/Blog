import { Schema, model } from "mongoose";

const publicationSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "El título es requerido"],
      maxlength: [100, "El título no puede exceder 100 caracteres"],
    },
    description: {
      type: String,
      required: [true, "El contenido es requerido"],
      maxlength: [500, "El contenido no puede exceder 500 caracteres"],
    },
    course: {
      type: String,
      required: [true, "El curso es requerido"],
      enum: {
        values: ["Taller", "Tecnología", "Practica_Supervisada"],
        message: "Curso no válido",
      },
    },
    dateAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

publicationSchema.methods.toJSON = function () {
  const { __v, status, createdAt, updatedAt, ...publication } = this.toObject();
  return publication;
};

export default model("Publication", publicationSchema);