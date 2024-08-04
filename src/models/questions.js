import mongoose, { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    questionUrl: String,
    question: String,
    options: {
      a: {
        type: String,
        default: "A",
      },
      b: {
        type: String,
        default: "B",
      },
      c: {
        type: String,
        default: "C",
      },
      d: {
        type: String,
        default: "D",
      },
      e: {
        type: String,
        default: "Not Attempted",
      },
    },
    answer: {
      type: String,
      enum: ["a", "b", "c", "d"],
      required: true,
    },
    timer: {type:Number,default:2},
    for: [
      {
        type: Types.ObjectId,
        ref: "Quiz",
        required:true
      },
    ],

    users: [
      {
        id: {
          type: Types.ObjectId,
          ref: "User",
        },
        choosed:{
          type: String,
          enum: ["a", "b", "c", "d","e"],
          required: true,
        },
        result: {
          type: String,
          default: "Number",
          enum: ["Wrong", "Right", "Not Attempted"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      }
    ],
    
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdDate: [],
  },
  { timestamps: true }
);

export const Question = mongoose.models.Question || model("Question", schema);
