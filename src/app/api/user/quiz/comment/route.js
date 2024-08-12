import { ResponseFailed, ResponseSuccess } from "@/middleware/Response";
import { userTryCatch } from "@/middleware/tryCatch";
import { Comment } from "@/models/comment";
import User from "@/models/user";





export const POST = userTryCatch(async(req)=>{
    const {quizId,message} = await req.json();

    if(!quizId || !message) return ResponseFailed(401,'fill all fields');

    const data = await Comment.create({message,for:quizId,user:req.id});

    return ResponseSuccess(201,"commented Successfully",data);
})

export const GET = userTryCatch(async (req) => {
    const { searchParams } = new URL(req.url);
    // console.log(searchParams);
    const quizId = searchParams.get("id");
    if (!quizId )
      return ResponseFailed(401, "please fill all the fields");
  
    const quiz = await Comment.find({for:quizId}).populate('user' , 'name avatar');
  
    if (!quiz) return ResponseFailed(400, "quiz not found");
  
  
  
    return ResponseSuccess(201, "comments get successfully", quiz);
  });