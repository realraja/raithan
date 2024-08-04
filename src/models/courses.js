import mongoose, { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
    subscribers: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    subjects: [
      {
        type: Types.ObjectId,
        ref: "Subject",
      },
    ],
    quizes: [
      {
        id: {
          type: Types.ObjectId,
          ref: "Quiz",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdDate: [],
  },
  { timestamps: true }
);

export const Course = mongoose.models.Course || model("Course", schema);
