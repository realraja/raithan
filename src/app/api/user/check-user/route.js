

import {ResponseFailed, ResponseSuccess } from "@/middleware/Response"
import {  userTryCatch } from "@/middleware/tryCatch";
import { Course } from "@/models/courses";
import User from "@/models/user";


export const GET = userTryCatch(async(req)=>{

        const user = await User.findById(req.id).populate('courses');

        if(!user) return ResponseFailed(401,"User not found");

        return ResponseSuccess(200,"all Data successfully get",{ user });
})