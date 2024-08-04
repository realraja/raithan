const { Schema, default: mongoose, Types } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dwc3gwskl/image/upload/v1721379013/samples/ecommerce/fiiijyy4cq1nrcp7t4zz.jpg",
      required: true,
    },
    username: { type: String }, 
    email: { type: String },
    verified: {
      type: Boolean,
      default: false,
    },
    courses:[{
      type: Types.ObjectId,
      ref: "Course",
  }],
    quizes:[{
      type: Types.ObjectId,
      ref: "Quiz",
  }],
    questions:[{
      type: Types.ObjectId,
      ref: "Question",
  }],

    totalFee: [{
      fee: Number,
      message: {
        type: String,
        default: "this is total fees",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    paid: [{
      fee: Number,
      message: {
        type: String,
        default: "fees paid",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],

    dummy_data: [],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdDate: [],

    email_otp: Number,
    phone_otp: Number,
    email_otp_expiry: Date,
    phone_otp_expiry: Date,


    token: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", schema);

export default User;
