import mongoose,{ Schema, Types, model } from "mongoose";


 

const schema = new Schema({
    name: String,
    for:[{
        type: Types.ObjectId,
        ref: "Course",
    }],
    createdAt: {
        type: Date,
        default: Date.now,
      },
      createdDate: [],
},{timestamps: true});

export const Subject = mongoose.models.Subject || model('Subject',schema);