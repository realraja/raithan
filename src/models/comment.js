import mongoose, { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    for: Types.ObjectId,
    message:{
      type: String,
      required: true,
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
      },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.models.Comment || model("Comment", schema);
