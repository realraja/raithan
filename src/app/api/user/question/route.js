import { userTryCatch } from "@/middleware/tryCatch";
import { Question } from "@/models/questions";
import User from "@/models/user";
const { ResponseFailed, ResponseSuccess } = require("@/middleware/Response");

export const PUT = userTryCatch(async (req) => {
  const {questionId, option} = await req.json();
  if(!questionId && !option ) return ResponseFailed(401,"please fill all the fields");

  const question = await Question.findById(questionId);

  if(!question) return ResponseFailed(400,'question not found');

  question.users = question.users.filter(user => user.id.toString() !== req.id.toString());

  question.users.push({
    id: req.id,
    choosed:option,
    result: option === 'e' ? "Not Attempted" : option === question.answer ? "Right" :"Wrong"
  })

  question.save();

  const user = await User.findById(req.id);

  user.questions = user.questions.filter((q) => q.toString() !== question._id.toString());
  user.questions.push(question._id);
  await user.save();

  

  return ResponseSuccess(201, "question created successfully", question);
});
