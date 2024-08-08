import { userTryCatch } from "@/middleware/tryCatch";
import { Question } from "@/models/questions";
import { Quiz } from "@/models/quizes";
import { Subject } from "@/models/subjects";
import User from "@/models/user";
const { ResponseFailed, ResponseSuccess } = require("@/middleware/Response");

export const PUT = userTryCatch(async (req) => {
  const { quizId, score } = await req.json();
  if (!quizId && !score)
    return ResponseFailed(401, "please fill all the fields");

  const quiz = await Quiz.findById(quizId);

  if (!quiz) return ResponseFailed(400, "quiz not found");

  quiz.usersDone = quiz.usersDone.filter(
    (user) => user.id.toString() !== req.id.toString()
  );

  quiz.usersDone.push({
    id: req.id,
    score,
  });

  quiz.save();

  const user = await User.findById(req.id);

  user.quizes = user.quizes.filter((q) => q.toString() !== quiz._id.toString());
  user.quizes.push(quiz._id);
  await user.save();

  return ResponseSuccess(201, "quiz update successfully", quiz);
});



export const GET = userTryCatch(async (req) => {
  const { searchParams } = new URL(req.url);
  // console.log(searchParams);
  const quizId = searchParams.get("id");
  if (!quizId )
    return ResponseFailed(401, "please fill all the fields");

  const quiz = await Quiz.findById(quizId).populate('questions').populate('forSubject', '_id name');

  if (!quiz) return ResponseFailed(400, "quiz not found");



  return ResponseSuccess(201, "question created successfully", quiz);
});