import { adminTryCatch } from "@/middleware/tryCatch";
import { Question } from "@/models/questions";
import { Quiz } from "@/models/quizes";
const { ResponseFailed, ResponseSuccess } = require("@/middleware/Response");
import cloudinary from "@/lib/cloudinary";

export const POST = adminTryCatch(async (req) => {
  const {questionUrl, question, answer , options,quiz,timer } = await req.json();
  if(!questionUrl && !question || !answer || !quiz) return ResponseFailed(401,"please fill all the fields");

  
  
  const quizUpdate = await Quiz.findById(quiz);
  if (!quizUpdate) return ResponseFailed(401, "this quiz not found", quiz);


  if(questionUrl){
    const uploadResponse = await cloudinary.uploader.upload(questionUrl, {
      folder: 'raithan'
    });

    const data = await Question.create({ questionUrl:uploadResponse.secure_url, answer, for:[quiz] ,timer});   
    
      await quizUpdate.questions.push(data._id);
      await quizUpdate.save(); 
  

  return ResponseSuccess(201, "question created successfully", data);
  }

  if(!options) return ResponseFailed(401,"please fill all the fields");


    const data = await Question.create({ question, answer, options, for:[quiz] ,timer});
  
  
  
  
  
  
      await quizUpdate.questions.push(data._id);
      await quizUpdate.save();
  
  

  return ResponseSuccess(201, "question created successfully", data);
});

export const DELETE = adminTryCatch(async (req) => {
  const { searchParams } = new URL(req.url);
  console.log(searchParams);
  const questionId = searchParams.get("questionId");
  const quiz = searchParams.get("quiz");
  if(!questionId || !quiz) return ResponseFailed(401,"please fill all the fields",searchParams);

  
  
  const quizUpdate = await Quiz.findById(quiz);
  if (!quizUpdate) return ResponseFailed(401, "this quiz not found", quiz);
  
  const question = await Question.findById(questionId);
  if (!question) return ResponseFailed(401, "this quiz not found", quiz);


  quizUpdate.questions = await quizUpdate.questions.filter(q => q.toString() !== questionId.toString());
      await quizUpdate.save();




    question.for = await question.for.filter(q => q.toString() !== quiz.toString());
    await question.save();
  
  
  
  
  
  
      
  
  

  return ResponseSuccess(201, "question deleted successfully", {question,quizUpdate});
});

export const PUT = adminTryCatch(async (req) => {
  const {questionUrl, question, answer , options,questionId,timer } = await req.json();
  if(!questionUrl && !question || !answer || !questionId) return ResponseFailed(401,"please fill all the fields");

  
  
  const questionUpdate = await Question.findById(questionId);
  if (!questionUpdate) return ResponseFailed(401, "this question not found", questionId);


  if(questionUrl){

    let uploadResponse;
    if(questionUrl !== questionUpdate.questionUrl){
     uploadResponse = await cloudinary.uploader.upload(questionUrl, {
      folder: 'raithan'
    });
}
    // const data = await Question.create({ questionUrl:uploadResponse.secure_url, answer ,timer}); 
    
    questionUpdate.questionUrl = uploadResponse?.secure_url || questionUrl;
    questionUpdate.answer = answer;
    questionUpdate.timer = timer;
    
      await questionUpdate.save(); 
  

  return ResponseSuccess(201, "question updated successfully", questionUpdate);
  }

  if(!options) return ResponseFailed(401,"please fill all the fields");


    // const data = await Question.create({ question, answer, options, for:[quiz] ,timer});
    questionUpdate.question = question;
    questionUpdate.options = options;
    questionUpdate.answer = answer;
    questionUpdate.timer = timer;
  
  
  
  
  
      await questionUpdate.save();
  
  

  return ResponseSuccess(201, "question updated successfully", questionUpdate);
});
