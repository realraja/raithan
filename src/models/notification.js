import mongoose, { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    name: String,
    phone: String,
    message:{
      type: String,
      required: true,
    },
    to:{
        type: String,
      enum: ["User", "Admin"],
      default: 'Admin',
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
      },
    done:[String],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.models.Notification || model("Notification", schema);
