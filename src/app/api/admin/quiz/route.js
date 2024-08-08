import { adminTryCatch } from "@/middleware/tryCatch";
import { Quiz } from "@/models/quizes";
import { Course } from "@/models/courses";
const { ResponseFailed, ResponseSuccess } = require("@/middleware/Response");

export const POST = adminTryCatch(async (req) => {
  const { name, courses, subject } = await req.json();
  if (!name || !courses || !subject) {
    return ResponseFailed(401, "Please fill all the fields");
  }

  // const quiz = await Quiz.findOne({ name });
  // if (quiz) {
  //   return ResponseFailed(401, "This quiz name is already created, please choose a different name", name);
  // }

  const data = await Quiz.create({ name, forCourse: courses, forSubject: subject });

  const updateCourses = courses.map(async (courseId) => {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error(`Course not found: ${courseId}`);
    }
    
    course.quizes.push({ id: data._id, createdAt: new Date() });
    await course.save();
  });

  try {
    await Promise.all(updateCourses);
    return ResponseSuccess(201, "Quiz created successfully", data);
  } catch (error) {
    return ResponseFailed(500, "Internal Server Error while updating courses", error);
  }
});
export const PUT = adminTryCatch(async (req) => {
  const { name,id,courses,subject } = await req.json();
  if (!name || !id || !courses || !subject) {
    return ResponseFailed(401, "Please fill all the fields");
  }

  const quiz = await Quiz.findById(id);
  if (!quiz) {
    return ResponseFailed(401, "This quiz not found", name);
  }

  quiz.name = name;
  quiz.forCourse = courses;
  quiz.forSubject = subject;
  quiz.save();
 
  const updateCourses = courses.map(async (courseId) => {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error(`Course not found: ${courseId}`);
    }
    
    course.quizes = course.quizes.filter(s=> s.id.toString() !== id.toString());
    course.quizes.push({ id, createdAt: new Date() });
    await course.save();
  });

  await Promise.all(updateCourses);
  return ResponseSuccess(200, "Quiz updated successfully", quiz);
});
export const GET = adminTryCatch(async (req) => {
  const { searchParams } = new URL(req.url);
  // console.log(searchParams);
  const id = searchParams.get("id");
  if(!id) return ResponseFailed(401,"please fill all the fields",searchParams);

  


  const quiz = await Quiz.findById(id);
  if (!quiz) {
    return ResponseFailed(401, "This quiz not found", name);
  }

  quiz.publish = !quiz.publish;
  quiz.save();
 

  return ResponseSuccess(200, "Quiz updated successfully", quiz);
});
