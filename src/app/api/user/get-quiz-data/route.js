import { ResponseSuccess } from "@/middleware/Response";
import { userTryCatch } from "@/middleware/tryCatch";
import { Question } from "@/models/questions";
import { Quiz } from "@/models/quizes";
import { Subject } from "@/models/subjects";




export const POST = userTryCatch(async(req)=>{
    const {courseId} = await req.json();

    const quizes = await Quiz.find({forCourse:courseId}).populate('questions').populate('forSubject', '_id name')


    return ResponseSuccess(200,'Quiz fetched Successfully',quizes);
})