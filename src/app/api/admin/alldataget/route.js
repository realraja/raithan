

import {ResponseSuccess } from "@/middleware/Response"
import { adminTryCatch } from "@/middleware/tryCatch";
import { Course } from "@/models/courses";
import { Question } from "@/models/questions";
import { Quiz } from "@/models/quizes";
import { Subject } from "@/models/subjects";
import User from "@/models/user";


export const GET = adminTryCatch(async(req)=>{

        const [users,courses,subjects,quizes,questions] = await Promise.all([
            User.find().populate('questions','users').populate('quizes','name questions usersDone createdAt'),
            Course.find(),
            Subject.find(),
            Quiz.find(),
            Question.find(),
        ])



        return ResponseSuccess(200,"all Data successfully get",{ users,courses,subjects,quizes,questions });
})