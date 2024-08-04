import mongoose, { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    name: String,
    publish:{
      type: Boolean,
      default: false
    },
    notification:{
      type: Boolean,
      default: false
    },
    forSubject: [
      {
        type: Types.ObjectId,
        ref: "Subject",
        required: true,
      },
    ],
    forCourse: [
      {
        type: Types.ObjectId,
        ref: "Course",
        required: true,
      },
    ],
    questions: [
      {
        type: Types.ObjectId,
        ref: "Question",
      },
    ],
    usersDone: [
      {
        id: {
          type: Types.ObjectId,
          ref: "User",
        },
        score: Number,
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

export const Quiz = mongoose.models.Quiz || model("Quiz", schema);
